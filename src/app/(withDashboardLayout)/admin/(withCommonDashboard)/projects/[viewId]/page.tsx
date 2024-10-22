"use client";
import { useGetSingleProjectQuery } from "@/components/Redux/ProjectApi/projectApi";
import Image from "next/image";
import React from "react";

interface ProjectViewProps {
  params: {
    viewId: string;
  };
}

const ViewProjectPage: React.FC<ProjectViewProps> = ({ params }) => {
  const viewId = params.viewId;
  const { data, isLoading } = useGetSingleProjectQuery(viewId);
  if (isLoading) {
    <h1>Loading...</h1>;
  }
  const projectData = data?.data;
  console.log("View ", projectData);
  return (
    <div className=" bg-white p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Project Information */}
        <div className="bg-gray-100 p-6 ">
          <h2 className="text-xl font-semibold text-slate-700 mb-4">
            Project Details
          </h2>
          <p className="text-lg text-slate-700">
            <span className="font-semibold">Project Name:</span>{" "}
            {projectData?.name}
          </p>
          <p className="text-lg text-slate-700">
            <span className="font-semibold">Start Date:</span>{" "}
            {new Date(
              projectData?.startDate.replace(/\[.*\]/, "")
            ).toLocaleString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-lg text-slate-700">
            <span className="font-semibold">End Date:</span>{" "}
            {new Date(
              projectData?.endDate.replace(/\[.*\]/, "")
            ).toLocaleString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        {/* Team Information */}
        <div className="bg-gray-100 p-6 ">
          <h2 className="text-xl font-semibold text-slate-700 mb-4">
            Team Details
          </h2>
          <p className="text-lg text-slate-700">
            <span className="font-semibold">Team Name:</span>{" "}
            {projectData?.team?.name}
          </p>
          <p className="text-lg text-slate-700">
            <span className="font-semibold">Field:</span>{" "}
            {projectData?.team?.field}
          </p>
          <p className="text-lg text-slate-700">
            <span className="font-semibold">Members:</span> 6
          </p>
        </div>
      </div>

      <div
        className="project-description text-lg text-slate-700 pt-6"
        dangerouslySetInnerHTML={{ __html: projectData?.projectDes }}
      />

      <div className=" flex gap-6 pt-6">
        <div className=" bg-gray-100">
          {projectData?.image && (
            <Image
              src={projectData?.image[0]}
              alt="Project Image"
              width={300}
              height={300}
              className=" p-2"
            />
          )}
        </div>
        <div className=" bg-gray-100">
          {projectData?.pdf && (
            <a
              href={projectData?.pdf[0]}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className=" p-2">
                <h1 className=" text-center -mb-6 text-lg font-semibold text-blue-600">
                  View
                </h1>
                <Image
                  src="https://cdn-icons-png.flaticon.com/128/14835/14835243.png"
                  alt="View PDF"
                  width={200}
                  height={200}
                  className="cursor-pointer"
                />
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProjectPage;
