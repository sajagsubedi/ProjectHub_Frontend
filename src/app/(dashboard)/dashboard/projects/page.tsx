"use client";

import ProjectCard from "@/components/dashboardComponents/ProjectCard";
import { ProjectType } from "@/types/Project.types";
import { useQuery } from "@apollo/client";
import { GETALLPROJECTS } from "@/graphql";

export default function PinnedProjects() {
  const { data, loading } = useQuery(GETALLPROJECTS);
  return (
    <div className="container mx-auto p-6">
      <div className="w-full flex flex-col items-center">
        <span className="h-1 w-20 bg-rose-500 rounded "></span>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-4">
          Your Projects
        </h2>
      </div>
      {loading && <div>Loading</div>}
      {!loading && data.getAllProjects.length != 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.getAllProjects.map((project: ProjectType, ind: number) => (
            <ProjectCard key={ind} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-red-500 text-2xl text-center">No projects to show! Add some projects</p>
      )}
    </div>
  );
}
