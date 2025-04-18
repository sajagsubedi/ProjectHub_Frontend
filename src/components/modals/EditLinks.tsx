import {
  CreateProjectInput,
  createProjectSchema,
} from "@/schemas/createProjectSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosClose } from "react-icons/io";
import LinksForm from "@/components/forms/LinksForm";
import { ApolloError, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { ProjectType } from "@/types/Project.types";
import { EDIT_PROJECT, GET_PROJECTBYID } from "@/graphql";

function EditLinks({
  changeLinksModal,
  projectInfo,
}: {
  changeLinksModal: (val: boolean) => void;
  projectInfo: ProjectType;
}) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      projectName: projectInfo.projectName, //required field for create project schema
      description: projectInfo.description, //required field for create project schema
      category: projectInfo.category as CreateProjectInput["category"], //required field for create project schema
      status: projectInfo.status, //required field for create project schema
      links: {
        source: projectInfo?.links?.source || "",
        deployment: projectInfo?.links?.deployment || "",
      },
    },
  });

  const [editProject] = useMutation(EDIT_PROJECT, {
    refetchQueries: [
      {
        query: GET_PROJECTBYID,
        variables: { getProjectByIdId: projectInfo._id },
      },
    ],
  });

  const onSubmit = async (data: CreateProjectInput) => {
    try {
      const { links } = data;

      await editProject({
        variables: {
          id: projectInfo._id,
          links: links,
        },
      });

      toast.success("Links updated successfully!");
      changeLinksModal(false);
    } catch (err) {
      const error = err as ApolloError;
      toast.error(error?.message || "Something went wrong");
    }
  };

  return (
    <section className="w-full h-full bg-gray-500 bg-opacity-30 fixed top-0 right-0 flex justify-center items-center z-[999] p-4 md:p-20">
      <div className="bg-rose-50 rounded-lg shadow-md w-full max-w-2xl">
        <div className="w-full flex justify-end">
          <button onClick={() => changeLinksModal(false)}>
            <IoIosClose className="h-8 w-8 md:h-10 md:w-10 text-gray-400" />
          </button>
        </div>
        <form
          className="space-y-6 px-4 md:px-10 py-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="text-rose-500 font-bold text-center text-xl md:text-2xl">
            Edit Links
          </h3>
          <LinksForm register={register} />
          <div className="flex flex-col sm:flex-row gap-2 mt-8 justify-center">
            <button
              type="button"
              onClick={() => changeLinksModal(false)}
              className="px-6 py-2 bg-white text-rose-500 rounded-md hover:bg-rose-200 border-2 border-rose-500 disabled:bg-rose-50 w-full sm:w-48"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600 disabled:bg-rose-400 w-full sm:w-48"
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default EditLinks;
