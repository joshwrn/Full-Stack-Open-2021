const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  gql,
} = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express');
const http = require('http');
const { createServer } = require('http');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const User = require('./models/user');
const Author = require('./models/author');
const Book = require('./models/book');
const mongoose = require('mongoose');

const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

console.log(process.env.MONGODB_URI);

const JWT_SECRET = process.env.JWT_KEY;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const authors = [];
const books = [];

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String]!
  }

  type User {
    username: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]!
    ): Book
    editAuthor(name: String!, born: Int!): Author
    createUser(username: String!): User
    login(username: String!, password: String!): Token
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Subscription {
    bookAdded: Book!
  }
`;
// the query type is where you connect the resolve to the actual objects i believe

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    allBooks: (root, args) => {
      // if (args.name && args.genre) {
      //   return books.filter(
      //     (b) =>
      //       b.author === args.name && b.genres.some((g) => g === args.genre)
      //   );
      // } else if (args.name) {
      //   return books.filter((b) => b.author === args.name);
      if (args.genre) {
        return Book.find({ genres: { $in: args.genre } }).populate('author');
      }
      return Book.find({}).populate('author');
    },
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
      });
      const found = await Author.findOne({ name: args.author });
      console.log('found', found);
      if (!found) {
        const author = new Author({ name: args.author, bookCount: 1 });
        console.log(author);
        await author.save();
        const got = await Author.findOne({ name: args.author });
        console.log('new author', got);
        book.author = got;
      } else if (found) {
        book.author = found;
        await Author.findOneAndUpdate(
          { name: args.author },
          { $inc: { bookCount: 1 } }
        );
      }
      await book.save();
      pubsub.publish('BOOK_ADDED', { bookAdded: book });

      return book;
    },
    editAuthor: (root, args) => {
      const author = authors.find((p) => p.name === args.name);
      if (!author) {
        return null;
      }
      const updatedAuthor = { ...author, born: args.born };
      authors = authors.map((p) => (p.name === args.name ? updatedAuthor : p));
      return updatedAuthor;
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
};

//$ new
async function startApolloServer() {
  // Required logic for integrating with Express
  const app = express();
  const httpServer = createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
        const currentUser = await User.findById(decodedToken.id);
        console.log('logged in');
        return { currentUser };
      }
    },
  });

  const subscriptionServer = SubscriptionServer.create(
    {
      // This is the `schema` we just created.
      schema,
      // These are imported from `graphql`.
      execute,
      subscribe,
    },
    {
      // This is the `httpServer` we created in a previous step.
      server: httpServer,
      // This `server` is the instance returned from `new ApolloServer`.
      path: server.graphqlPath,
    }
  );

  // More required logic for integrating with Express
  await server.start();
  server.applyMiddleware({
    app,

    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: '/',
  });

  // Modified server startup
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer();
