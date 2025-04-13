import { gql } from "@apollo/client";

export const GETPINNEDPROJECTS = gql`
  query GetPinnedProjects {
    getPinnedProjects {
      _id
      projectName
      description
      status
      category
      deadline
      techStack
    }
  }
`;

export const GETALLPROJECTS = gql`
  query GetAllProjects {
    getAllProjects {
      _id
      projectName
      description
      status
      category
      deadline
      techStack
    }
  }
`;
