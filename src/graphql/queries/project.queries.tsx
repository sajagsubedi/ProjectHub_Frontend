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
