import { z } from "zod";

// Define the CategoryType enum
const CategoryTypeEnum = z.enum([
  "Web",
  "Mobile",
  "AI",
  "DataScience",
  "Other",
]);

// Define the StatusType enum
const StatusTypeEnum = z.enum([
  "Idea",
  "Designing",
  "Pending",
  "InProgress",
  "Closed",
  "Open",
]);

// Define the LinksInput schema
const LinksInputSchema = z.object({
  source: z.string().optional(), // Optional source link
  deployment: z.string().optional(), // Optional deployment link
});

// Define the createProject schema
const createProjectSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Description is required"),
  motive: z.string().optional(),
  category: CategoryTypeEnum,
  status: StatusTypeEnum,
  techStack: z.array(z.object({ value: z.string() })).optional(),
  features: z.array(z.object({ value: z.string() })).optional(),
  startDate: z.string().optional(),
  deadline: z.string().optional(),
  links: LinksInputSchema.optional(),
  tutorials: z
    .array(z.object({ url: z.string(), label: z.string() }))
    .optional(),
});

// Export the schema and inferred type
export type CreateProjectInput = z.infer<typeof createProjectSchema>;

export { createProjectSchema, CategoryTypeEnum, StatusTypeEnum };
