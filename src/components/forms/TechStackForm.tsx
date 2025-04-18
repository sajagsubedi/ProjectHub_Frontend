import { CreateProjectInput } from "@/schemas/createProjectSchema";
import React from "react";
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

function TechStackForm({
  register,
  techStackFields,
  appendTech,
  removeTech,
}: {
  register: UseFormRegister<CreateProjectInput>;
  techStackFields: FieldArrayWithId<CreateProjectInput, "techStack", "id">[];
  appendTech: UseFieldArrayAppend<CreateProjectInput, "techStack">;
  removeTech: UseFieldArrayRemove;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Tech Stack
      </label>
      <div className="flex gap-4 flex-wrap">
        {techStackFields.map((field, index) => (
          <div
            key={field.id}
            className="flex gap-2 bg-white rounded-md border border-gray-300 overflow-hidden transition-all duration-200 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-200 "
          >
            <input
              {...register(`techStack.${index}.value`)}
              className="w-full bg-white text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              placeholder="Eg: React, Next.js"
            />
            <button
              type="button"
              onClick={() => removeTech(index)}
              className="text-gray-400 hover:text-gray-600"
            >
              <MdDelete size={20} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendTech({ value: "" })}
          className="flex items-center bg-white rounded-md border border-rose-500 text-rose-500 gap-2 px-3 py-1 text-base outline-none h-[43px]"
        >
          <FaPlus size={16} /> Add Technology
        </button>
      </div>
    </div>
  );
}

export default TechStackForm;
