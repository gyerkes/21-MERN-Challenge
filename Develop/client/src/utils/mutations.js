import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user
    }
  }`

export const ADD_USER = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user
    }
  }`

export const SAVE_BOOK = gql`
mutation Mutation($data: BookData) {
  saveBook(data: $data) {
    _id
    username
    email
    bookCount
    savedBooks {
      bookId
      title
    }
  }
}`

export const REMOVE_BOOK = gql`
mutation RemoveBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        author
        description
        title
        image
        link
      }
    }
  }`