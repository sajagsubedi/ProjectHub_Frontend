"use client";

import ProjectCard from "@/components/dashboardComponents/ProjectCard";
import { ProjectType } from "@/types/Project.types";
import { useQuery } from "@apollo/client";
import { GETALLPROJECTS } from "@/graphql";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";

const categories = ["All", "Web", "Mobile", "AI", "DataScience", "Other"];
const statuses = [
  "All",
  "Idea",
  "Designing",
  "Pending",
  "InProgress",
  "Closed",
  "Open",
];

export default function PinnedProjects() {
  const { data, loading } = useQuery(GETALLPROJECTS);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (data) {
      setProjects(data.getAllProjects);
    }
  }, [data]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter((project: ProjectType) => {
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "All" || project.status === selectedStatus;
    const matchesSearch =
      project.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <section className="container mx-auto px-[5vw] py-10">
      <div className="w-full flex flex-col items-center">
        <span className="h-1 w-20 bg-rose-500 rounded "></span>
        <h2 className="text-2xl md:text-3xl font-bold text-rose-500 mb-4">
          Your Projects
        </h2>
      </div>
      <div className="flex justify-end w-full">
        <Link
          className="bg-rose-500 text-white p-2 rounded mb-4 flex gap-2 items-center justify-center"
          href="/dashboard/projects/create"
        >
          <FaPlus />
          New Project
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="relative">
            <BiSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <select
            className="border border-gray-300 rounded-md px-4 py-2 bg-white focus:ring-rose-500 focus:border-rose-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            className="border border-gray-300 rounded-md px-4 py-2 bg-white focus:ring-rose-500 focus:border-rose-500"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
      {loading && <div>Loading</div>}
      {!loading && filteredProjects.length != 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project: ProjectType, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-red-500 text-2xl text-center">
          No projects to show! Add some projects
        </p>
      )}
    </section>
  );
}
