import ProjectCard from "./ProjectCard";
import { ProjectType } from "@/types/Project.types";
import { useQuery } from "@apollo/client";
import { GETPINNEDPROJECTS } from "@/graphql";

export default function PinnedProjects() {
  const { data, loading } = useQuery(GETPINNEDPROJECTS);
  return (
    <div className="container mx-auto p-6">
      <div className="w-full flex flex-col items-center">
        <span className="h-1 w-20 bg-rose-500 rounded "></span>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-4">
          Pinned Projects
        </h2>
      </div>
      {loading && <div>Loading</div>}
      {!loading && data.getPinnedProjects.length != 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.getPinnedProjects.map((project: ProjectType, ind: number) => (
            <ProjectCard key={ind} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-red-500 text-2xl">No projects pinned!</p>
      )}
    </div>
  );
}
