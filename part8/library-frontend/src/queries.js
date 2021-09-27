import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      id
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query findByGenre($allBooksGenre: String) {
    allBooks(genre: $allBooksGenre) {
      title
      author {
        id
        name
        born
      }
      published
      id
      genres
    }
  }
`;
// author caused an issue

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        id
        name
        born
      }
      published
      id
      genres
    }
  }
`;

export const REC = gql`
  query findByGenre($allBooksGenre: String!) {
    allBooks(genre: $allBooksGenre) {
      title
      author {
        id
        name
        born
      }
      published
      id
      genres
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook(
    $author: String!
    $title: String!
    $published: Int!
    $genres: [String]!
  ) {
    addBook(
      author: $author
      title: $title
      published: $published
      genres: $genres
    ) {
      author {
        id
        name
        born
      }
      title
      published
      genres
      id
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      name
      born
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
