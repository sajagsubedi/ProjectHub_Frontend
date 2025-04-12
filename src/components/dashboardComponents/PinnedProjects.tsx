import { sampleProjects } from "@/constants/Projects";
import ProjectCard from "./ProjectCard";
import { categoryEnum, statusEnum } from "@/types/Project.types";

export default function PinnedProjects() {
  return (
    <div className="container mx-auto p-6">
      <div className="w-full flex flex-col items-center">
        <span className="h-1 w-20 bg-rose-500 rounded "></span>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-4">
          Pinned Projects
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleProjects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            projectName={project.projectName}
            description={project.description}
            category={project.category as categoryEnum}
            status={project.status as statusEnum}
            deadline={new Date(project.deadline)}
            techStack={project.techStack}
          />
        ))}
      </div>
    </div>
  );
}
