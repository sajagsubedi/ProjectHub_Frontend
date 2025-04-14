export enum categoryEnum {
  Web = "Web",
  Mobile = "Mobile",
  AI = "AI",
  DataScience = "Data Science",
  Other = "Other",
}
export enum statusEnum {
  Idea = "Idea",
  Designing = "Designing",
  Pending = "Pending",
  InProgress = "InProgress",
  Closed = "Closed",
  Open = "Open",
}

export interface ProjectType {
  _id: string;
  projectName: string;
  description: string;
  category?: categoryEnum;
  status?: statusEnum;
  deadline?: Date;
  techStack?: string[];
  links?: {
    source?: string;
    deployment?: string;
  };
  isPinned?: true;
}
