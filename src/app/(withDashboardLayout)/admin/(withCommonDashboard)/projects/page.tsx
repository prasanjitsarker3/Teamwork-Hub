/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import {
  useDeleteProjectMutation,
  useGetAllProjectQuery,
} from "@/components/Redux/ProjectApi/projectApi";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { EditIcon, EyeIcon, Plus, Search, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "LEAD", uid: "teamId" },
  { name: "START DATE", uid: "startDate" },
  { name: "END DATE", uid: "endDate" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

const ProjectManagementPage = () => {
  const { data, isLoading } = useGetAllProjectQuery({});
  const [deleteProject] = useDeleteProjectMutation();

  const handleDeleteProject = async (id: string) => {
    const toastId = toast.loading("Processing...");
    try {
      const res = await deleteProject(id);
      console.log("Res", res);
      if (res?.data?.statusCode === 200) {
        toast.success(res?.data?.message, { id: toastId, duration: 1000 });
      } else {
        toast.error(res?.data?.message, { id: toastId, duration: 1000 });
      }
    } catch (err: any) {
      console.log(err?.message);
    }
  };

  const renderCell = React.useCallback(
    (projectData: any, columnKey: React.Key) => {
      const cellValue = projectData[columnKey as any];

      switch (columnKey) {
        case "name":
          return (
            <div>
              <p className="text-bold text-lg capitalize primaryColor">
                {projectData?.name}
              </p>
            </div>
          );
        case "teamId":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-lg capitalize text-slate-700 ">
                {projectData?.team?.name}
              </p>
            </div>
          );
        case "startDate":
          return (
            <div className="">
              <p className="text-bold text-lg capitalize  text-slate-700">
                {new Date(
                  projectData?.startDate.replace(/\[.*\]/, "")
                ).toLocaleString("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          );
        case "endDate":
          return (
            <div className="">
              <p className="text-bold text-lg capitalize  text-slate-700">
                {new Date(
                  projectData?.endDate.replace(/\[.*\]/, "")
                ).toLocaleString("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          );
        case "status":
          return (
            <div className="">
              <p className="text-bold text-lg capitalize text-[#028355]">
                {projectData?.status}
              </p>
            </div>
          );

        case "actions":
          return (
            <div className=" w-full relative flex justify-center items-center gap-2">
              <Tooltip content="View Project">
                <Link href={`/admin/projects/${projectData.id}`}>
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EyeIcon />
                  </span>
                </Link>
              </Tooltip>
              <Tooltip content="Update Project">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete Project">
                <span
                  onClick={() => handleDeleteProject(projectData?.id)}
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                >
                  <Trash />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );
  if (isLoading) {
    <h1>loading...</h1>;
  }

  const projectData = data?.data || [];
  console.log("Project Data", projectData);
  return (
    <div className=" bg-white p-10">
      <div className="flex items-center gap-4">
        <Link href="/admin/projects/assign">
          <button className="bg-[#0c9ecf] flex items-center text-white py-1 px-6 text-lg font-semibold rounded-md">
            <Plus /> Assign New Project
          </button>
        </Link>

        <div className="relative">
          <input
            type="search"
            placeholder="Searching..."
            className="pl-10 pr-4 py-1 w-52 border border-gray-200 bg-white rounded-lg focus:outline-none focus:border-blue-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-500" size={20} />
          </div>
        </div>
      </div>
      <div className=" pt-5">
        <Table
          isStriped
          removeWrapper
          aria-label="Example table with custom cells"
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={projectData}>
            {(item) => (
              //@ts-ignore
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProjectManagementPage;
