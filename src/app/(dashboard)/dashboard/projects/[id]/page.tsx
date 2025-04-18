"use client";

import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { ApolloError } from "@apollo/client";

import {
  FaCode,
  FaRegCalendar,
  FaRocket,
  FaLink,
  FaBookOpen,
  FaExternalLinkAlt,
  FaArrowLeft,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { MdPushPin, MdOutlinePushPin } from "react-icons/md";
import { LuBoxes } from "react-icons/lu";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { GET_PROJECTBYID, PIN_PROJECT } from "@/graphql";
import { ProjectType } from "@/types/Project.types";
import LoadingPage from "@/components/publicComponents/LoadingPage";
import { useRouter } from "next/navigation";
import EditProjectOverview from "@/components/modals/EditProjectOverview";
import EditTechStack from "@/components/modals/EditTechStack";
import EditFeatures from "@/components/modals/EditFeatures";
import EditLinks from "@/components/modals/EditLinks";
import EditTutorials from "@/components/modals/EditTutorials";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data, loading, error } = useQuery(GET_PROJECTBYID, {
    variables: {
      getProjectByIdId: id,
    },
  });
  const router = useRouter();

  const [project, setProject] = useState<ProjectType | undefined>();

  const [showAllImages, setShowAllImages] = useState(false);
  const [visibleImages, setVisibleImages] = useState([]);
  const hasMoreImages = project?.draftUi && project?.draftUi.length > 3;

  const [modalState, setModalState] = useState({
    projectOverview: false,
    techStack: false,
    features: false,
    links: false,
    tutorials: false,
  });

  const [pinProject] = useMutation(PIN_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTBYID, variables: { getProjectByIdId: id } }],
  });

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      // TODO: Implement delete functionality
      console.log("Delete project:", id);
    }
  };

  function formatDate(date: Date | undefined) {
    if (!date) return "Not mentioned";
    return new Date(Number(date)).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  const changeEditProjectOverviewModal = (val:boolean) => {
    setModalState((p) => ({
      ...p,
      projectOverview: val,
    }));
  };

  const changeTechStackModal = (val:boolean) => {
    setModalState((p) => ({
      ...p,
      techStack: val,
    }));
  };

  const changeFeaturesModal = (val: boolean) => {
    setModalState((p) => ({
      ...p,
      features: val,
    }));
  };

  const changeLinksModal = (val: boolean) => {
    setModalState((p) => ({
      ...p,
      links: val,
    }));
  };

  const changeTutorialsModal = (val: boolean) => {
    setModalState((p) => ({
      ...p,
      tutorials: val,
    }));
  };

  const handlePinClick = async () => {
    try {
      await pinProject({
        variables: { id },
      });
      toast.success(`Project ${project?.isPinned ? "unpinned" : "pinned"} successfully!`);
    } catch (err) {
      const error = err as ApolloError;
      toast.error(error?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (data) {
      if (data.getProjectById) {
        setProject(data?.getProjectById);
        setVisibleImages(
          showAllImages
            ? data?.getProjectById.draftUi
            : data?.getProjectById.draftUi?.slice(0, 3)
        );
      }
    }
  }, [data, showAllImages]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <main className="w-full px-4 md:px-10 py-4">
      <button
        className="text-white py-2 p-1 rounded outline-none bg-rose-500 mb-10 flex gap-2 items-center justify-center hover:bg-rose-600"
        onClick={() => router.back()}
      >
        <FaArrowLeft /> Back
      </button>

      {modalState.projectOverview && (
        <EditProjectOverview
        changeEditProjectOverviewModal={changeEditProjectOverviewModal}
          projectInfo={project as ProjectType}
        />
      )}
       {modalState.techStack && (
        <EditTechStack
        changeTechStackModal={changeTechStackModal}
          projectInfo={project as ProjectType}
        />
      )}
      {modalState.features && (
        <EditFeatures
          changeFeaturesModal={changeFeaturesModal}
          projectInfo={project as ProjectType}
        />
      )}
      {modalState.links && (
        <EditLinks
          changeLinksModal={changeLinksModal}
          projectInfo={project as ProjectType}
        />
      )}
      {modalState.tutorials && (
        <EditTutorials
          changeTutorialsModal={changeTutorialsModal}
          projectInfo={project as ProjectType}
        />
      )}
      {project ? (
        <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white shadow-lg to-gray-50 rounded-2xl overflow-hidden pb-5">
          <div className="bg-gradient-to-r from-rose-500 to-rose-400 p-4 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {project.projectName}
                </h1>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
                  {project.status}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="text-white hover:text-rose-200 transition-colors"
                  title="Edit Project"
                  onClick={() => {
                    changeEditProjectOverviewModal(true);
                  }}
                >
                  <FaEdit className="text-xl" />
                </button>
                <button
                  onClick={handleDelete}
                  className="text-white hover:text-rose-200 transition-colors"
                  title="Delete Project"
                >
                  <FaTrash className="text-xl" />
                </button>
                <button
                  onClick={handlePinClick}
                  className="text-white hover:text-rose-200 transition-colors"
                  title={project?.isPinned ? "Unpin Project" : "Pin Project"}
                >
                  {project?.isPinned ? (
                    <MdPushPin className="text-2xl text-white" />
                  ) : (
                    <MdOutlinePushPin className="text-2xl text-white" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 p-3 md:p-6">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              {/* Description section */}
              <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg md:text-xl font-semibold mb-4 text-rose-500">
                  Description
                </h2>
                <p className="text-gray-700 text-sm md:text-base">
                  {project.description}
                </p>
                <h3 className="text-base md:text-lg font-semibold mt-4 mb-2 text-rose-500">
                  Motive
                </h3>
                <p className="text-gray-700 text-sm md:text-base">
                  {project.motive ? project.motive : "Not mentioned!"}
                </p>
              </div>

              {/* Features section */}
              <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 relative">
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-rose-500 transition-colors"
                  title="Edit Features"
                  onClick={() => changeFeaturesModal(true)}
                >
                  <FaEdit className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2 mb-4">
                  <FaRocket className="w-5 h-5 text-rose-500" />
                  <h2 className="text-lg md:text-xl font-semibold text-rose-500">
                    Features
                  </h2>
                </div>
                {project.features && project.features.length !== 0 ? (
                  <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm md:text-base">
                    {project.features?.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No features mentioned!</p>
                )}
              </div>

              {/* UI Drafts */}
              <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 relative">
                <a
                  href={`/dashboard/projects/${id}/edit?section=ui-drafts`}
                  className="absolute top-4 right-4 text-gray-400 hover:text-rose-500 transition-colors"
                  title="Edit UI Drafts"
                >
                  <FaEdit className="w-4 h-4" />
                </a>
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-lg md:text-xl font-semibold text-rose-500">
                    UI Drafts
                  </h2>
                </div>
                <div className="relative">
                  {visibleImages.length !== 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {visibleImages?.map(
                        (draft: { url: string; public_id?: string }, index) => (
                          <div key={index} className="relative group">
                            <Image
                              src={draft?.url}
                              alt="UI Draft"
                              height={400}
                              width={400}
                              className="rounded-lg w-full h-32 sm:h-40 md:h-48 object-cover hover:opacity-90 transition-opacity"
                            />
                            {index === 2 && !showAllImages && hasMoreImages && (
                              <button
                                onClick={() => setShowAllImages(true)}
                                className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center text-white font-semibold"
                              >
                                +{project.draftUi!.length - 3} more
                              </button>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <p>No ui drafts!</p>
                  )}

                  {hasMoreImages && (
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={() => setShowAllImages(!showAllImages)}
                        className="flex items-center gap-2 text-rose-500 hover:text-rose-600 transition-colors text-sm md:text-base"
                      >
                        <span>{showAllImages ? "Show Less" : "View All"}</span>
                        <FaExternalLinkAlt className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-4 md:space-y-6">
              {/* Project Info */}
              <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <LuBoxes className="w-5 h-5 text-rose-500" />
                  <h2 className="text-lg md:text-xl font-semibold text-rose-500">
                    Project Info
                  </h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500 text-sm md:text-base">
                      Category
                    </p>
                    <p className="text-gray-900 text-sm md:text-base">
                      {project.category}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <FaRegCalendar className="h-5 w-5 text-rose-500" />
                      <h2 className="text-lg md:text-xl font-semibold text-rose-500">
                        Timeline
                      </h2>
                    </div>
                    <div className="space-y-4">
                      <div className="flex gap-2 items-center">
                        <p className="text-gray-500 text-sm md:text-base">
                          Start Date:
                        </p>
                        <p className="text-gray-900 text-sm md:text-base">
                          {formatDate(project.startDate)}
                        </p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <p className="text-gray-500 text-sm md:text-base">
                          Deadline:
                        </p>
                        <p className="text-gray-900 text-sm md:text-base">
                          {formatDate(project.deadline)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 relative">
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-rose-500 transition-colors"
                  title="Edit Tech Stack"
                  onClick={() => changeTechStackModal(true)}
                >
                  <FaEdit className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2 mb-4">
                  <FaCode className="w-5 h-5 text-rose-500" />
                  <h2 className="text-lg md:text-xl font-semibold text-rose-500">
                    Tech Stack
                  </h2>
                </div>
                {project?.techStack?.length !== 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {project.techStack?.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 md:px-3 py-1 rounded-full bg-rose-50 text-rose-500 border border-rose-200 text-sm md:text-base"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p>No tech stack mentioned!</p>
                )}
              </div>

              {/* Links */}
              <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 relative">
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-rose-500 transition-colors"
                  title="Edit Links"
                  onClick={() => changeLinksModal(true)}
                >
                  <FaEdit className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2 mb-4">
                  <FaLink className="w-5 h-5 text-rose-500" />
                  <h2 className="text-lg md:text-xl font-semibold text-rose-500">
                    Links
                  </h2>
                </div>
                {project?.links?.source && project?.links?.deployment ? (
                  <div className="space-y-2">
                    {project?.links.source && (
                      <a
                        href={project.links?.source}
                        className="block px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 text-sm md:text-base"
                      >
                        Source Code
                      </a>
                    )}
                    {project.links?.deployment && (
                      <a
                        href={project.links?.deployment}
                        className="block px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 text-sm md:text-base"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                ) : (
                  <p>No links attached!</p>
                )}
              </div>

              {/* Tutorials */}
              <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 relative">
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-rose-500 transition-colors"
                  title="Edit Tutorials"
                  onClick={() => changeTutorialsModal(true)}
                >
                  <FaEdit className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2 mb-4">
                  <FaBookOpen className="w-5 h-5 text-rose-500" />
                  <h2 className="text-lg md:text-xl font-semibold text-rose-500">
                    Tutorials
                  </h2>
                </div>
                {project?.tutorials?.length !== 0 ? (
                  <ul className="space-y-2">
                    {project.tutorials?.map((tutorial, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer text-gray-700 text-sm md:text-base"
                      >
                        <a href={tutorial.url} target="_blank">
                          {tutorial.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No tutorials mentioned!</p>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <p>No project found!</p>
      )}
    </main>
  );
}
