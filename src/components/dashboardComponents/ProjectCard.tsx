// components/ProjectCard.tsx
"use client";

import React from "react";
import Link from "next/link";
import { ProjectType } from "@/types/Project.types";
import { PiNeedle } from "react-icons/pi";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdOutlinePushPin, MdPushPin } from "react-icons/md";

// Utility function to truncate description
const truncateText = (text: string, maxLength: number) =>
  text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

const ProjectCard = ({ project }: { project: ProjectType }) => {
  const {
    _id,
    projectName,
    description,
    category,
    status,
    deadline,
    techStack,
    isPinned,
  } = project;

  return (
    <div
      key={_id}
      className="bg-white rounded-2xl shadow-md overflow-hidden p-6"
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-2xl font-bold text-rose-500">{projectName}</h2>
          {isPinned ? (
            <MdPushPin className="text-rose-500" size={20} />
          ) : (
            <MdOutlinePushPin className="text-rose-500" size={20} />
          )}
        </div>

        <p className="text-gray-600 text-base mb-4">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {category}
          </span>
          <span
            className={`px-4 py-2 rounded-full text-sm font-medium
                  ${
                    project.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : project.status === "InProgress"
                      ? "bg-blue-100 text-blue-800"
                      : project.status === "Designing"
                      ? "bg-purple-100 text-purple-800"
                      : project.status === "Closed"
                      ? "bg-gray-100 text-gray-800"
                      : project.status === "Open"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
          >
            {status}
          </span>
        </div>

        <div className="text-gray-600 mb-4">
          <div className="font-medium mb-2">
            Deadline:
            {project.deadline ? project.deadline.toString() : "No deadline"}
          </div>
        </div>

        <div className="mb-4">
          <div className="font-medium text-gray-700 mb-2">Tech Stack:</div>
          <div className="flex flex-wrap gap-1 mt-1">
            {techStack &&
              techStack.slice(0, 3).map((tech, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                >
                  {tech}
                </span>
              ))}
            {techStack && techStack.length > 3 && (
              <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                +{techStack.length - 3}
              </span>
            )}
          </div>
        </div>

        <div className="mt-auto">
          <Link
            className="w-full bg-rose-500 text-white py-2 rounded hover:bg-rose-600 transition-colors flex items-center justify-center gap-2 text-base"
            href={`/dashboard/projects/${project._id}`}
          >
            <span>View Details</span>
            <FaExternalLinkAlt size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
