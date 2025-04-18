import { CategoryTypeEnum, CreateProjectInput, StatusTypeEnum } from "@/schemas/createProjectSchema";
import React from "react";
import { UseFormRegister } from "react-hook-form";

const ProjectOverview = ({
  register,
}: {
  register: UseFormRegister<CreateProjectInput>;
}) => {
  return (
    <>
      {/* Basic Information */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="projectName"
              className="leading-7 text-sm text-gray-600"
            >
              Project Name(<span className="text-red-500">*</span>)
            </label>
            <input
              type="text"
              id="projectName"
              {...register("projectName")}
              required
              placeholder="Enter the project name"
              className="w-full bg-white rounded border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
            <div>
              <label
                className="leading-7 text-sm text-gray-600"
                htmlFor="category"
              >
                Category(<span className="text-red-500">*</span>)
              </label>
              <select
                {...register("category")}
                className="w-full bg-white rounded border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              >
                {Object.values(CategoryTypeEnum.enum).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                className="leading-7 text-sm text-gray-600"
                htmlFor="status"
              >
                Status(<span className="text-red-500">*</span>)
              </label>
              <select
                {...register("status")}
                className="w-full bg-white rounded border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out [&>option:checked]:text-rose-500 [&>option:checked]:bg-rose-50"
              >
                {Object.values(StatusTypeEnum.enum).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="description"
              className="leading-7 text-sm text-gray-600"
            >
              Project Description(<span className="text-red-500">*</span>)
            </label>
            <textarea
              {...register("description")}
              required
              rows={2}
              className="w-full bg-white rounded border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <div>
            <label htmlFor="motive" className="leading-7 text-sm text-gray-600">
              Motive
            </label>
            <textarea
              {...register("motive")}
              rows={2}
              className="w-full bg-white rounded border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="startDate"
          >
            Start Date
          </label>
          <input
            type="date"
            {...register("startDate")}
            className="w-full bg-white rounded border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="deadline"
          >
            Deadline
          </label>
          <input
            type="date"
            {...register("deadline")}
            className="w-full bg-white rounded border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
    </>
  );
};

export default ProjectOverview;
