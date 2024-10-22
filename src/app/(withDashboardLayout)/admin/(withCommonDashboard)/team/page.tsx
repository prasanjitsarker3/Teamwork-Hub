/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import CreateNewTeam from "@/components/AdminDashboardRoute/TeamManagement/CreateNewTeam";
import { useGetAllTeamDataQuery } from "@/components/Redux/TeamApi/teamApi";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { EditIcon, EyeIcon, Search, Trash, Users } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const columns = [
  { name: "PROFILE", uid: "image" },
  { name: "NAME", uid: "name" },
  { name: "TEAM LEAD", uid: "teamHead" },
  { name: "PROJECTS", uid: "successProjects" },
  { name: "UPDATE DATE", uid: "createdAt" },
  { name: "ACTIONS", uid: "actions" },
];

const TeamPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const query: Record<string, any> = {
    searchTerm,
    page,
    limit,
  };

  const { data, isLoading } = useGetAllTeamDataQuery(query);
  if (isLoading) {
    <h1>Loading....</h1>;
  }

  const renderCell = React.useCallback(
    (teamData: any, columnKey: React.Key) => {
      const cellValue = teamData[columnKey as any];

      switch (columnKey) {
        case "image":
          return (
            <div>
              <div className=" w-16 h-16   ">
                <Image
                  src={
                    teamData?.image ||
                    "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid"
                  }
                  alt=""
                  height={80}
                  width={80}
                  className=" h-full w-full rounded-full border-2 border-[#0c9ecf]"
                />
              </div>
            </div>
          );
        case "name":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-lg capitalize primaryColor">
                {teamData?.name}
              </p>
              <p className="text-bold text-lg capitalize text-default-400">
                Software Developer
              </p>
            </div>
          );
        case "teamHead":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-lg capitalize primaryColor">
                {teamData?.teamHead?.name}
              </p>
              <p className="text-bold text-lg capitalize text-default-400 flex items-center gap-2">
                <Users size={16} />6
              </p>
            </div>
          );
        case "successProjects":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-lg capitalize text-[#028355]">
                Success - {teamData?.successProjects}
              </p>
              <p className="text-bold text-lg capitalize text-[#D76E4C] flex items-center gap-2">
                Pending - {teamData?.pendingProjects}
              </p>
            </div>
          );
        case "createdAt":
          return (
            <div className="flex flex-col">
              <h3 className="text-lg text-gray-500 ">Something</h3>
              <h3 className="text-lg text-gray-500 ">
                {new Date(teamData?.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </h3>
            </div>
          );

        case "actions":
          return (
            <div className=" w-full relative flex justify-center items-center gap-2">
              <Tooltip content="Details">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Edit user">
                <span
                  // onClick={() => {
                  //   setSelectedUser(userManageData);
                  //   onOpen();
                  // }}
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <span
                  // onClick={() => handleDeleteUser(userManageData?.id)}
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
  const teamData = data?.data?.data || [];
  const metaData = data?.data?.meta;
  const total = metaData?.total || 0;
  const countPage = Math.ceil(total / limit);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className=" bg-white p-10">
      <div className="flex items-center space-x-5  mb-8">
        <CreateNewTeam />
        <div className="relative">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            type="search"
            placeholder="Searching..."
            className="pl-10 pr-4 py-2 w-52 border border-gray-200 bg-white rounded-lg focus:outline-none focus:border-blue-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-500" size={20} />
          </div>
        </div>
      </div>
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
        <TableBody items={teamData}>
          {(item) => (
            //@ts-ignore
            <TableRow key={item.id || item.email}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className=" flex justify-center py-3">
        <Pagination
          total={countPage}
          page={page}
          showControls
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default TeamPage;
