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

function FeaturesForm({
  register,
  featureFields,
  appendFeature,
  removeFeature,
}: {
  register: UseFormRegister<CreateProjectInput>;
  featureFields: FieldArrayWithId<CreateProjectInput, "features", "id">[];
  appendFeature: UseFieldArrayAppend<CreateProjectInput, "features">;
  removeFeature: UseFieldArrayRemove;
}) {
  return (
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
          <button
            type="button"
            onClick={() => removeFeature(index)}
            className="text-gray-400 hover:text-gray-600"
          >
            <MdDelete size={20} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default FeaturesForm;
