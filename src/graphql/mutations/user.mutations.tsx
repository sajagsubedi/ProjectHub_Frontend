import { gql } from "@apollo/client";

const SIGN_UP = gql`
  mutation Signup(
    $fullName: String!
    $email: String!
    $username: String!
    $password: String!
  ) {
    signup(
      fullName: $fullName
      email: $email
      username: $username
      password: $password
    ) {
      success
      message
      user {
        _id
        fullName
        email
        username
      }
    }
  }
`;

export { SIGN_UP };
