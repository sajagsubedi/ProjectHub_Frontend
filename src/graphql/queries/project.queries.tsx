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
      isPinned
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
      isPinned
    }
  }
`;

export const GET_PROJECTBYID = gql`
  query GetProjectById($getProjectByIdId: ID!) {
    getProjectById(id: $getProjectByIdId) {
      _id
      projectName
      description
      motive
      status
      category
      startDate
      deadline
      features
      draftUi {
        url
        public_id
      }
      links {
        source
        deployment
      }
      tutorials {
        url
        label
      }
      isPinned
      techStack
    }
  }
`;
