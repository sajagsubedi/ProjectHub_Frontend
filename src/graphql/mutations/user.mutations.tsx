import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation Signup(
    $avatar: Upload!
    $fullName: String!
    $email: String!
    $username: String!
    $password: String!
  ) {
    signup(
      avatar: $avatar
      fullName: $fullName
      email: $email
      username: $username
      password: $password
    ) {
      success
      message
    }
  }
`;

export const SIGN_IN = gql`
  mutation Signin($identifier: String!, $password: String!) {
    signin(identifier: $identifier, password: $password) {
      success
      message
      accessToken
      refreshToken
    }
  }
`;
