import { gql } from "@apollo/client";

export const GET_AUTHUSER = gql`
  query AuthUser {
    authUser {
      user {
        _id
        username
        fullName
        email
        avatar{
          url
        }
      }
      isAuthenticated
    }
  }
`;
