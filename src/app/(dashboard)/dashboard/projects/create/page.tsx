"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { FaArrowLeft, FaExternalLinkAlt, FaLink, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  CategoryTypeEnum,
  CreateProjectInput,
  createProjectSchema,
  StatusTypeEnum,
} from "@/schemas/createProjectSchema";
import { toast } from "react-toastify";
import { ApolloError, useMutation } from "@apollo/client";
import { CREATE_PROJECT, GETALLPROJECTS } from "@/graphql";
import { ProjectType } from "@/types/Project.types";

function Page() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      projectName: "",
      description: "",
      motive: "",
      category: "Web",
      status: "Idea",
      techStack: [],
      features: [],
      startDate: "",
      deadline: "",
      links: { source: "", deployment: "" },
      tutorials: [],
    },
  });

  const {
    fields: techStackFields,
    append: appendTech,
    remove: removeTech,
  } = useFieldArray({
    control,
    name: "techStack",
  });

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    control,
    name: "features",
  });

  const {
    fields: tutorialFields,
    append: appendTutorial,
    remove: removeTutorial,
  } = useFieldArray({
    control,
    name: "tutorials",
  });

  const [createProject, { loading }] = useMutation(CREATE_PROJECT, {
    refetchQueries: [{ query: GETALLPROJECTS }],
  });

  const onSubmit: SubmitHandler<CreateProjectInput> = async (data) => {
    console.log(data);
    try {
      const {
        projectName,
        description,
        motive,
        category,
        status,
        techStack,
        features,
        startDate,
        deadline,
        tutorials,
        links,
      } = data;
      console.log(startDate, deadline);

      const newTechStack = techStack?.map((item) => {
        if (item.value.trim() != "") {
          return item.value;
        }
      });

      const newFeatures = features?.map((item) => {
        if (item.value.trim() != "") {
          return item.value;
        }
      });
      const conditionalValue: { startDate?: String; deadline?: String } = {};
      if (startDate) {
        conditionalValue.startDate = startDate;
      }
      if (deadline) {
        conditionalValue.deadline = deadline;
      }

      await createProject({
        variables: {
          ...conditionalValue,
          projectName,
          description,
          motive,
          category,
          status,
          techStack: newTechStack,
          features: newFeatures,
          tutorials,
          links,
        },
      });

      toast.success("New Project created successfully!");
      reset(); // Reset form values
    } catch (err) {
      const error = err as ApolloError;
      toast.error(error?.message || "Something went wrong");
    }
  };

  return (
    <main className="w-full px-2  py-2 bg-gray-50">
      <button
        className="text-white py-2 p-1 rounded outline-none bg-rose-500 mb-10 flex gap-2 items-center justify-center hover:bg-rose-600"
        onClick={() => window.history.back()}
      >
        <FaArrowLeft /> Back
      </button>

      <section className="md:px-10 shadow-2xl rounded-lg p-5 py-5 md:mx-[5vw]">
        <h2 className="text-2xl text-center text-rose-500 font-semibold mb-5">
          Create Project
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                <label
                  htmlFor="motive"
                  className="leading-7 text-sm text-gray-600"
                >
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

          {/* Tech Stack */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Tech Stack
              </label>
              <button
                type="button"
                onClick={() => appendTech({ value: "" })}
                className="text-rose-500 text-sm flex items-center gap-1"
              >
                <FaPlus size={16} /> Add Technology
              </button>
            </div>
            <div className="flex gap-4 flex-wrap">
              {techStackFields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex gap-2 mb-2 bg-white rounded-md border border-gray-300 overflow-hidden transition-all duration-200 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-200 "
                >
                  <input
                    {...register(`techStack.${index}.value`)}
                    className="w-full bg-white text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="Eg: React, Next.js"
                  />
                  {techStackFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTech(index)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <MdDelete size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Features
              </label>
              <button
                type="button"
                onClick={() => appendFeature({ value: "" })}
                className="text-rose-500 hover:text-rose-600 text-sm flex items-center gap-1"
              >
                <FaPlus size={16} /> Add Feature
              </button>
            </div>
            {featureFields.map((field, index) => (
              <div
                key={field.id}
                className="flex gap-2 mb-2 bg-white rounded-md border border-gray-300 overflow-hidden transition-all duration-200 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-200"
              >
                <input
                  {...register(`features.${index}.value`)}
                  className="w-full bg-white text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="Enter a feature"
                />
                {featureFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <MdDelete size={20} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Links */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Links
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <FaLink size={16} className="text-gray-400" />
                <input
                  type="url"
                  {...register("links.source")}
                  placeholder="Source code url"
                  className="w-full bg-white rounded border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="flex items-center gap-2">
                <FaExternalLinkAlt size={16} className="text-gray-400" />
                <input
                  type="url"
                  {...register("links.deployment")}
                  placeholder="Live url"
                  className="w-full bg-white rounded border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
          </div>

          {/* Tutorials */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Tutorials
              </label>
              <button
                type="button"
                onClick={() => appendTutorial({ url: "", label: "" })}
                className="text-rose-500 hover:text-rose-600 text-sm flex items-center gap-1"
              >
                <FaPlus size={16} /> Add Tutorial
              </button>
            </div>
            {tutorialFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 mb-2">
                <div className="grid grid-cols-2 w-full gap-4">
                  <input
                    type="text"
                    {...register(`tutorials.${index}.label`)}
                    className="w-full bg-white rounded border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="Tutorial Label"
                  />
                  <input
                    type="url"
                    {...register(`tutorials.${index}.url`)}
                    className="w-full bg-white rounded border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="Tutorial URL"
                  />
                </div>
                {tutorialFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTutorial(index)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <MdDelete size={20} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600 disabled:bg-rose-300"
            >
              {isSubmitting ? "Creating..." : "Create Project"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Page;
