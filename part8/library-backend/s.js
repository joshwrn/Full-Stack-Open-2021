const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  gql,
} = require('apollo-server');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const User = require('./models/user');
const Author = require('./models/author');
const Book = require('./models/book');
const mongoose = require('mongoose');

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
  Author: {
    bookCount: (root) => books.filter((b) => b.author === root.name).length,
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
        const author = new Author({ name: args.author });
        await author.save();
        const got = await Author.findOne({ name: args.author });
        console.log('new author', got);
        book.author = got;
      } else if (found) {
        book.author = found;
      }
      await book.save();
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
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
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

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
