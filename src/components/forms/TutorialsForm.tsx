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

function TutorialsForm({
  register,
  tutorialFields,
  appendTutorial,
  removeTutorial,
}: {
  register: UseFormRegister<CreateProjectInput>;
  tutorialFields: FieldArrayWithId<CreateProjectInput, "tutorials", "id">[];
  appendTutorial: UseFieldArrayAppend<CreateProjectInput, "tutorials">;
  removeTutorial: UseFieldArrayRemove;
}) {
  return (
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
            <button
              type="button"
              onClick={() => removeTutorial(index)}
              className="text-gray-400 hover:text-gray-600"
            >
              <MdDelete size={20} />
            </button>
        </div>
      ))}
    </div>
  );
}

export default TutorialsForm; 