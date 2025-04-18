// components/ProjectCard.tsx
"use client";

import React from "react";
import Link from "next/link";
import { ProjectType } from "@/types/Project.types";
import { FaExternalLinkAlt, FaTrash } from "react-icons/fa";
import { MdOutlinePushPin, MdPushPin } from "react-icons/md";
import { useMutation } from "@apollo/client";
import { PIN_PROJECT, DELETE_PROJECT, GETALLPROJECTS } from "@/graphql";
import { toast } from "react-toastify";
import { ApolloError } from "@apollo/client";
import { useConfirm } from "@/context/ConfirmProvider";

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

  const [pinProject] = useMutation(PIN_PROJECT, {
    refetchQueries: [{ query: GETALLPROJECTS }],
  });

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    refetchQueries: [{ query: GETALLPROJECTS }],
  });

  const handlePinClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await pinProject({
        variables: { id: _id },
      });
      toast.success(
        `Project ${isPinned ? "unpinned" : "pinned"} successfully!`
      );
    } catch (err) {
      const error = err as ApolloError;
      toast.error(error?.message || "Something went wrong");
    }
  };

  const { showAlert, onConfirm } = useConfirm();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    showAlert("project");
    onConfirm(handleDeleteConfirm);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteProject({
        variables: { id: _id },
      });
      toast.success("Project deleted successfully!");
    } catch (err) {
      const error = err as ApolloError;
      toast.error(error?.message || "Something went wrong");
    }
  };

  return (
    <Link
      href={`/dashboard/projects/${_id}`}
      className="bg-white rounded-2xl shadow-md overflow-hidden p-6 block"
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-2xl font-bold text-rose-500">{projectName}</h2>
          <div className="flex gap-2">
            <button
              onClick={handlePinClick}
              className="text-rose-500 hover:text-rose-600 transition-colors"
              title={isPinned ? "Unpin Project" : "Pin Project"}
            >
              {isPinned ? (
                <MdPushPin size={20} />
              ) : (
                <MdOutlinePushPin size={20} />
              )}
            </button>
            <button
              onClick={handleDelete}
              className="text-rose-500 hover:text-rose-600 transition-colors"
              title="Delete Project"
            >
              <FaTrash size={18} />
            </button>
          </div>
        </div>

        <p className="text-gray-600 text-base mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {category}
          </span>
          <span
            className={`px-4 py-2 rounded-full text-sm font-medium
                  ${
                    status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : status === "InProgress"
                      ? "bg-blue-100 text-blue-800"
                      : status === "Designing"
                      ? "bg-purple-100 text-purple-800"
                      : status === "Closed"
                      ? "bg-gray-100 text-gray-800"
                      : status === "Open"
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
            {deadline
              ? new Date(Number(deadline)).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : " No deadline"}
          </div>
        </div>

        <div className="mb-4">
          <div className="font-medium text-gray-700 mb-2">Tech Stack:</div>
          <div className="flex flex-wrap gap-1 mt-1">
            {techStack && techStack?.length != 0 ? (
              techStack.slice(0, 3).map((tech, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                >
                  {tech}
                </span>
              ))
            ) : (
              <p className="text-gray-600">Not Mentioned</p>
            )}
            {techStack && techStack.length > 3 && (
              <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                +{techStack.length - 3}
              </span>
            )}
          </div>
        </div>

        <div className="mt-auto">
          <div className="w-full bg-rose-500 text-white py-2 rounded hover:bg-rose-600 transition-colors flex items-center justify-center gap-2 text-base">
            <span>View Details</span>
            <FaExternalLinkAlt size={18} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
