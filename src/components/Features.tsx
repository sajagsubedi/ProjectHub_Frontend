import React from "react";
import {
  FaProjectDiagram,
  FaTasks,
  FaLink,
  FaGraduationCap,
  FaPalette,
  FaCloudUploadAlt,
} from "react-icons/fa";

// Define the type for a feature
type Feature = {
  icon: JSX.Element;
  title: string;
  description: string;
};

// Define the props for the FeaturesSection component
interface FeaturesSectionProps {
  features?: Feature[];
}

// Default features array
const defaultFeatures: Feature[] = [
  {
    icon: <FaProjectDiagram />,
    title: "Project Creation & Management",
    description: "Organize and categorize projects effectively.",
  },
  {
    icon: <FaPalette />,
    title: "UI Design Integration",
    description: "Attach draft UIs from Figma/Adobe for easy reference.",
  },
  {
    icon: <FaTasks />,
    title: "Task & To-Do Management",
    description: "Track progress efficiently with an interactive task manager.",
  },
  {
    icon: <FaLink />,
    title: "Source & Deployment Links",
    description:
      "Connect GitHub repositories and live projects for easy access.",
  },
  {
    icon: <FaGraduationCap />,
    title: "Tutorials & Learning Resources",
    description:
      "Store and access guides, documentation, and learning materials.",
  },
  {
    icon: <FaCloudUploadAlt />,
    title: "Cloud Storage Integration",
    description: "Securely store project assets and resources in the cloud.",
  },
];

const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  features = defaultFeatures,
}) => {
  return (
    <section className="py-10 md:py-0 md:px-[5vw] px-6">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <div className="w-full lg:mb-0 flex flex-col items-center">
          <div className="h-1 w-20 bg-rose-500 rounded"></div>
          <h2 className="sm:text-3xl text-2xl font-bold title-font mb-2 text-gray-700">
            FEATURES
          </h2>
        </div>
        <p className="text-gray-600 text-base">
          Simplifying project management with powerful tools and seamless
          integration.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {features.length > 0 ? (
          features.map((feature, index) => (
            <div key={index} className="flex">
              <div className="feature-card shadow-md py-6 px-5 rounded-2xl bg-white hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col h-full w-full">
                <div className="flex flex-col items-center text-center flex-grow">
                  <div className="mb-4">
                    <div className="mb-6 p-4 bg-rose-50 rounded-full">
                      {React.cloneElement(feature.icon, {
                        size: 32,
                        className:
                          "transition-colors duration-300 text-rose-500",
                      })}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 col-span-full text-center">
            No features available.
          </p>
        )}
      </div>
    </section>
  );
};

export default FeaturesSection;
