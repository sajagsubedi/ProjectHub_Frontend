import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
  mutation CreateProject(
    $projectName: String!
    $description: String!
    $motive: String
    $category: CategoryType
    $status: StatusType
    $techStack: [String]
    $features: [String]
    $startDate: String
    $deadline: String
    $links: LinksInput
    $tutorials: [TutorialsInput]
  ) {
    createProject(
      projectName: $projectName
      description: $description
      motive: $motive
      category: $category
      status: $status
      techStack: $techStack
      features: $features
      startDate: $startDate
      deadline: $deadline
      links: $links
      tutorials: $tutorials
    ) {
      projectName
    }
  }
`;

export const EDIT_PROJECT = gql`
  mutation EditProject(
    $id: ID!
    $projectName: String
    $description: String
    $motive: String
    $category: CategoryType
    $status: StatusType
    $techStack: [String]
    $features: [String]
    $startDate: String
    $deadline: String
    $links: LinksInput
    $tutorials: [TutorialsInput]
    $isPinned: Boolean
  ) {
    editProject(
      id: $id
      projectName: $projectName
      description: $description
      motive: $motive
      category: $category
      status: $status
      techStack: $techStack
      features: $features
      startDate: $startDate
      deadline: $deadline
      links: $links
      tutorials: $tutorials
      isPinned: $isPinned
    ) {
      _id
      userId
      projectName
      description
      motive
      category
      status
      startDate
      deadline
      techStack
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
        label
        url
      }
      isPinned
    }
  }
`;

export const PIN_PROJECT = gql`
  mutation PinProject($id: ID!) {
    pinProject(id: $id) {
      _id
      isPinned
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
      _id
    }
  }
`;

export const EDIT_DRAFT_UI = gql`
  mutation EditDraftUi(
    $id: ID!
    $files: [Upload]!
    $order: [DraftUiOrderInput]!
  ) {
    editDraftUi(
      id: $id
      files: $files
      order: $order
    ) {
      _id
      draftUi {
        url
        public_id
      }
    }
  }
`;
