"use client";

import { useEffect } from "react";
import {
  FaProjectDiagram,
  FaTasks,
  FaLink,
  FaGraduationCap,
  FaPalette,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { gsap } from "gsap";

const features = [
  {
    icon: <FaProjectDiagram size={30} color="#E63946" />,
    title: "Project Creation & Management",
    description: "Organize and categorize projects effectively.",
  },
  {
    icon: <FaPalette size={30} color="#E63946" />,
    title: "UI Design Integration",
    description: "Attach draft UIs from Figma/Adobe for easy reference.",
  },
  {
    icon: <FaTasks size={30} color="#E63946" />,
    title: "Task & To-Do Management",
    description: "Track progress efficiently with an interactive task manager.",
  },
  {
    icon: <FaLink size={30} color="#E63946" />,
    title: "Source & Deployment Links",
    description:
      "Connect GitHub repositories and live projects for easy access.",
  },
  {
    icon: <FaGraduationCap size={30} color="#E63946" />,
    title: "Tutorials & Learning Resources",
    description:
      "Store and access guides, documentation, and learning materials.",
  },
  {
    icon: <FaCloudUploadAlt size={30} color="#E63946" />,
    title: "Cloud Storage Integration",
    description: "Securely store project assets and resources in the cloud.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-10 md:px-[5vw]">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <div className=" w-full lg:mb-0 flex flex-col items-center">
          <div className="h-1 w-20 bg-rose-500 rounded"></div>
          <h2 className="sm:text-3xl text-2xl font-bold title-font mb-2 text-gray-700 ">
            FEATURES
          </h2>
        </div>
        <p className="text-gray-600">
          Simplifying project management with powerful tools and seamless
          integration.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={index}>
            <div className="feature-card shadow-md p-6 rounded-2xl bg-white hover:shadow-lg transition">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text- base font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
