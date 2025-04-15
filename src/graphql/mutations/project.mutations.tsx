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
