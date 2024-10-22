/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { CloudUpload, ImagePlus, SendHorizontal } from "lucide-react"; // Lucide icons
import { useGetAllTeamDataQuery } from "@/components/Redux/TeamApi/teamApi";
import { Button, DatePicker, Select, SelectItem } from "@nextui-org/react";
import { now, getLocalTimeZone } from "@internationalized/date";
import { useCreateProjectMutation } from "@/components/Redux/ProjectApi/projectApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface IFormInput {
  images: FileList;
  pdfs: FileList;
  teamId: string;
  startDate: string;
  endDate: string;
}

const AssignNewProject = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<IFormInput>();
  const [value, setQuillValue] = useState("");
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [pdfPreviews, setPdfPreviews] = useState<string[]>([]);
  const [startDate, setStartDate] = useState(now(getLocalTimeZone()));
  const [endDate, setEndDate] = useState(now(getLocalTimeZone()));

  const { data, isLoading } = useGetAllTeamDataQuery({});
  const [createProject, { isLoading: creating }] = useCreateProjectMutation();
  const router = useRouter();
  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  const teamData = data?.data?.data || [];

  const onSubmit = async (formData: IFormInput) => {
    const toastId = toast.loading("Project Creating");
    const dataSend = {
      ...formData,
      startDate: startDate.toString(),
      endDate: endDate.toString(),
      projectDes: value,
    };

    // Creating FormData to send files and other data
    const formDataToSend = new FormData();
    const { images, pdfs, ...dataWithoutFiles } = formData;
    // Append the form data (without files)
    formDataToSend.append("data", JSON.stringify(dataSend));
    // Append images if they exist
    if (images && images.length > 0) {
      Array.from(images).forEach((image, index) => {
        formDataToSend.append(`image`, image); // Append each image file with a unique key
      });
    }
    // Append PDFs if they exist
    if (pdfs && pdfs.length > 0) {
      Array.from(pdfs).forEach((pdf, index) => {
        formDataToSend.append(`pdf`, pdf); // Append each PDF file with a unique key
      });
    }

    try {
      const response = await createProject(formDataToSend);
      if (response?.data?.statusCode === 201) {
        toast.success(response?.data?.message, { id: toastId, duration: 1000 });
        router.push("/admin/projects");
        reset();
      } else {
        toast.error(response?.data?.message, { id: toastId, duration: 1000 });
      }
    } catch (err: any) {
      console.log(err?.message);
    }
  };

  const handleImagePreview = (files: FileList) => {
    const fileArray = Array.from(files);
    const imageUrls = fileArray.map((file) => URL.createObjectURL(file));
    setImagePreviews(imageUrls);
  };

  const handlePdfPreview = (files: FileList) => {
    const fileArray = Array.from(files);
    const pdfUrls = fileArray.map((file) => URL.createObjectURL(file));
    setPdfPreviews(pdfUrls);
  };

  return (
    <div className="bg-white p-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* ReactQuill for project description */}
        <div className="mb-6">
          <ReactQuill theme="snow" value={value} onChange={setQuillValue} />
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-5 sm:grid-cols-2 gap-12">
          {/* Team Head Selection */}
          <div className="flex flex-col gap-2 mt-2">
            <Select
              size="md"
              label="Select Team"
              className="w-full"
              {...register("teamId", {
                required: "Team Head is required",
              })}
            >
              {teamData.map((item: any) => (
                <SelectItem key={item.id} value={item.id}>
                  {item?.name}
                </SelectItem>
              ))}
            </Select>
            {errors.teamId && (
              <span className="text-red-500">{errors.teamId.message}</span>
            )}
          </div>

          {/* Start Date */}
          <div className="flex flex-col gap-2 mt-2">
            <DatePicker
              label="Start Date"
              //   variant="bordered"
              hideTimeZone
              showMonthAndYearPickers
              defaultValue={startDate}
              onChange={(date) => {
                setStartDate(date);
                setValue("startDate", date.toString());
              }}
            />
            {errors.startDate && (
              <span className="text-red-500">Start Date is required</span>
            )}
          </div>

          {/* End Date */}
          <div className="flex flex-col gap-2 mt-2">
            <DatePicker
              label=" End Date"
              //   variant="bordered"
              hideTimeZone
              showMonthAndYearPickers
              defaultValue={endDate}
              onChange={(date) => {
                setEndDate(date);
                setValue("endDate", date.toString());
              }}
            />
            {errors.endDate && (
              <span className="text-red-500">End Date is required</span>
            )}
          </div>

          {/* Image Upload */}
          <div className="mb-6 mt-2">
            <div className="flex items-center space-x-3 w-full">
              <label
                htmlFor="photo-upload"
                className="cursor-pointer w-full flex items-center space-x-2 px-3 py-4 rounded-md bg-gray-100 hover:bg-gray-200"
              >
                <ImagePlus size={24} className="text-gray-600" />{" "}
                <span className="text-gray-600">Upload Photos</span>
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                multiple
                {...register("images", {
                  onChange: (e) => handleImagePreview(e.target.files),
                })}
                className="hidden"
              />
            </div>

            {/* Image Previews */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              {imagePreviews.map((src, index) => (
                <Image
                  key={index}
                  src={src}
                  alt={`Preview ${index}`}
                  width={60}
                  height={60}
                  className="w-14 h-14 object-cover"
                />
              ))}
            </div>
          </div>

          {/* PDF Upload */}
          <div className="mb-6 mt-2">
            <div className="flex items-center space-x-3 w-full">
              <label
                htmlFor="pdf-upload"
                className="cursor-pointer w-full flex items-center space-x-2  px-3 py-4 rounded-md bg-gray-100 hover:bg-gray-200"
              >
                <CloudUpload size={24} className="text-gray-600" />{" "}
                <span className="text-gray-600">Upload PDFs</span>
              </label>
              <input
                id="pdf-upload"
                type="file"
                accept="application/pdf"
                multiple
                {...register("pdfs", {
                  onChange: (e) => handlePdfPreview(e.target.files),
                })}
                className="hidden"
              />
            </div>

            {/* PDF Previews */}
            <div className="mt-4 grid grid-cols-1 gap-4">
              {pdfPreviews.map((src, index) => (
                <a
                  key={index}
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View PDF {index + 1}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <Button
            isDisabled={creating}
            type="submit"
            className="w-72 mx-auto bg-[#0c9ecf] flex justify-center items-center gap-3 text-white px-6 py-2 rounded-md"
          >
            Submit Project <SendHorizontal size={20} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AssignNewProject;
