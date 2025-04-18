"use client";

import React, { useRef, useState } from "react";
import { ProjectType } from "@/types/Project.types";
import Image from "next/image";
import { FaPlus, FaTrash, FaExternalLinkAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { EDIT_DRAFT_UI } from "@/graphql/mutations/project.mutations";
import { GET_PROJECTBYID } from "@/graphql";

interface EditUIDraftsProps {
  changeUIDraftsModal: (val: boolean) => void;
  projectInfo: ProjectType;
}

interface ImageDataType {
  url: string;
  public_id?: string;
  index_id?: number;
}

const EditUIDrafts = ({
  changeUIDraftsModal,
  projectInfo,
}: EditUIDraftsProps) => {
  const { draftUi } = projectInfo;
  const draftUiRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<ImageDataType[]>(draftUi || []);
  const [showAllImages, setShowAllImages] = useState(false);
  const hasMoreImages = previews.length > 3;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [editDraftUi] = useMutation(EDIT_DRAFT_UI, {
    refetchQueries: [
      {
        query: GET_PROJECTBYID,
        variables: { getProjectByIdId: projectInfo._id },
      },
    ],
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages((prev) => {
      return [...prev, ...files];
    });

    const filePreviews = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise<ImageDataType>((resolve) => {
        reader.onloadend = () =>
          resolve({
            url: reader.result as string,
            index_id: images.length,
          } as ImageDataType);
      });
    });

    Promise.all(filePreviews).then((loadedPreviews: ImageDataType[]) => {
      setPreviews((prev) => [...prev, ...loadedPreviews]);
    });
  };

  const handleDeleteImage = (index: number) => {
    if (previews[index].public_id) {
      const newPreviews = previews.filter((_, i) => i !== index);
      setPreviews(newPreviews);
    } else {
      const newImages = images.filter(
        (_, ind) => ind !== previews[index].index_id
      );

      const newPreviews = previews
        .map((prev, i) => {
          if (prev.index_id === undefined) return prev;
          if (index < i) {
            return { ...prev, index_id: prev.index_id - 1 };
          } else if (index > i) {
            return prev;
          }
          return null;
        })
        .filter((preview): preview is ImageDataType => preview !== null);

      setImages(newImages);
      setPreviews(
        newPreviews.filter(
          (preview): preview is ImageDataType => preview !== null
        )
      );
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      images.forEach((file) => {
        formData.append("files", file);
      });

      const order = previews.map((preview) => {
        if (preview.public_id) {
          return {
            url: preview.url,
            public_id: preview.public_id,
          };
        } else {
          return {
            index_id: preview.index_id,
          };
        }
      });

      await editDraftUi({
        variables: {
          id: projectInfo._id,
          files: images,
          order,
        },
      });

      toast.success("UI drafts updated successfully!");
      changeUIDraftsModal(false);
    } catch (error) {
      toast.error("Failed to update UI drafts");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-rose-500">Edit UI Drafts</h2>
          <button
            onClick={() => changeUIDraftsModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex flex-wrap gap-4">
            <div className="mt-4 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {(showAllImages ? previews : previews.slice(0, 3))?.map(
                  (src, index) => (
                    <div key={index} className="relative group">
                      <Image
                        src={src?.url}
                        alt="UI Draft"
                        height={400}
                        width={400}
                        className="rounded-lg w-full h-32 sm:h-40 md:h-48 object-cover hover:opacity-90 transition-opacity border border-gray-200"
                      />
                      {!(
                        previews.length > 3 &&
                        !showAllImages &&
                        index === 2
                      ) && (
                        <button
                          onClick={() => handleDeleteImage(index)}
                          className="absolute top-1 right-1 text-red-500 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      )}
                      {!showAllImages && index === 2 && hasMoreImages && (
                        <button
                          onClick={() => setShowAllImages(true)}
                          className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center text-white font-semibold"
                        >
                          +{previews.length - 3} more
                        </button>
                      )}
                    </div>
                  )
                )}

                <label className="relative group">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-rose-500 transition-colors flex flex-col items-center justify-center gap-2 h-32 sm:h-40 md:h-48">
                    <FaPlus className="text-gray-600 text-2xl" />
                    <span className="text-gray-600">Add UI Draft</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    ref={draftUiRef}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </label>
              </div>

              {hasMoreImages && (
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => setShowAllImages(!showAllImages)}
                    className="flex items-center gap-2 text-rose-500 hover:text-rose-600 transition-colors text-sm md:text-base"
                  >
                    <span>{showAllImages ? "Show Less" : "View All"}</span>
                    <FaExternalLinkAlt className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => changeUIDraftsModal(false)}
            className="px-2 py-1 bg-white text-red-500 border border-red-500 rounded-md hover:bg-red-50 w-28 flex justify-center items-center"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUIDrafts;
