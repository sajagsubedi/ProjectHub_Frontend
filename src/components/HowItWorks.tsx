import React from "react";
import {
  FaUserPlus,
  FaFolderOpen,
  FaTasks,
  FaPalette,
  FaShareAlt,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaUserPlus />,
    title: "Sign Up",
    description: "Users create an account easily.",
  },
  {
    icon: <FaFolderOpen />,
    title: "Create a Project",
    description: "Add a project name, description, and category.",
  },
  {
    icon: <FaTasks />,
    title: "Manage Tasks & Todos",
    description: "Organize and track project progress.",
  },
  {
    icon: <FaPalette />,
    title: "Attach Draft UI",
    description: "Link design drafts from Figma/Adobe.",
  },
  {
    icon: <FaShareAlt />,
    title: "Deploy & Share",
    description: "Share project links and track status.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-16 px-6 md:px-[5vw] bg-gray-50">
      <div className="mx-auto text-center mb-12">
        <div className="w-full lg:mb-0 flex flex-col items-center">
          <span className="h-1 w-20 bg-rose-500 rounded mb-4"></span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
            HOW IT WORKS
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Follow these simple steps to streamline your project workflow.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-6 px-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex-1 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group transform hover:-translate-y-2"
          >
            <div className="flex flex-col items-center h-full">
              <div className="mb-6 p-4 bg-rose-50 rounded-full">
                {React.cloneElement(step.icon, {
                  size: 32,
                  className: "transition-colors duration-300 text-rose-500",
                })}
              </div>
              <div className="text-center flex flex-col h-full">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed mb-4 flex-grow">
                  {step.description}
                </p>
                <span className="text-rose-600 font-semibold text-sm">
                  Step {index + 1}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
