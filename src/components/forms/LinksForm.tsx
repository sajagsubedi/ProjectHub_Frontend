import { CreateProjectInput } from "@/schemas/createProjectSchema";
import React from "react";
import { UseFormRegister } from "react-hook-form";
import { FaLink, FaExternalLinkAlt } from "react-icons/fa";

function LinksForm({
  register,
}: {
  register: UseFormRegister<CreateProjectInput>;
}) {
  return (
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
  );
}

export default LinksForm; 
 