// components/ProjectCard.tsx
"use client";

import React from "react";
import Link from "next/link";
import { format, isValid } from "date-fns";
import { ProjectCardProps } from "@/types/Project.types";

// Utility function to get status badge color
const getStatusColor = (status?: string) => {
  switch (status) {
    case "InProgress":
      return "bg-blue-500 text-white";
    case "Closed":
      return "bg-green-500 text-white";
    case "Pending":
      return "bg-yellow-400 text-gray-800";
    case "Idea":
      return "bg-gray-500 text-white";
    case "Designing":
      return "bg-purple-500 text-white";
    case "Open":
      return "bg-teal-500 text-white";
    default:
      return "bg-gray-300 text-black";
  }
};

// Utility function to get category badge color
const getCategoryColor = (category?: string) => {
  switch (category) {
    case "Web":
      return "bg-indigo-100 text-indigo-800";
    case "Mobile":
      return "bg-blue-100 text-blue-800";
    case "AI":
      return "bg-purple-100 text-purple-800";
    case "Data Science":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Utility function to truncate description
const truncateText = (text: string, maxLength: number) =>
  text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  projectName,
  description,
  category = "Other",
  status = "Pending",
  deadline,
  techStack = [],
}) => {
  const formattedDeadline =
    deadline && isValid(new Date(deadline))
      ? format(new Date(deadline), "MMM dd, yyyy")
      : "No deadline";

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full hover:shadow-lg transition-shadow">
      <h2
        className="text-xl font-semibold text-rose-500 truncate"
        title={projectName}
      >
        {projectName}
      </h2>

      {/* Description */}
      <p
        className="mt-2 text-sm text-gray-600 line-clamp-2"
        title={description}
      >
        {truncateText(description, 100)}
      </p>

      {/* Category and Status */}
      <div className="mt-3 flex gap-2">
        <span
          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(
            category
          )}`}
        >
          {category}
        </span>
        <span
          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
            status
          )}`}
        >
          {status}
        </span>
      </div>

      {/* Deadline */}
      <p className="mt-3 text-sm text-gray-600">
        <span className="font-medium">Deadline:</span> {formattedDeadline}
      </p>

      {/* Tech Stack */}
      {techStack.length > 0 && (
        <div className="mt-3">
          <p className="text-sm text-gray-600 font-medium">Tech Stack:</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {techStack.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
              >
                {tech}
              </span>
            ))}
            {techStack.length > 3 && (
              <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                +{techStack.length - 3}
              </span>
            )}
          </div>
        </div>
      )}

      {/* View Details Button - Uses rose-500 */}
      <div className="mt-4">
        <Link href={`/dashboard/projects/${id}`}>
          <button className="w-full bg-rose-500 text-white py-2 px-4 rounded-md hover:bg-rose-600 transition-colors">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
