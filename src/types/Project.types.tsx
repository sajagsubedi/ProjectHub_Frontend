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
  motive?: string;
  category?: categoryEnum;
  status?: statusEnum;
  startDate?: Date;
  deadline?: Date;
  techStack?: string[];
  features?: string[];
  draftUi?: {
    url: string;
    public_id: string;
  }[];
  links?: {
    source?: string;
    deployment?: string;
  };
  tutorials?: {
    label: string;
    url: string;
  }[];
  isPinned: boolean;
}
