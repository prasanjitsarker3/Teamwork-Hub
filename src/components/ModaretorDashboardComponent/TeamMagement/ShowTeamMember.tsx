/* eslint-disable react-hooks/exhaustive-deps */
"use client";
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { EditIcon, EyeIcon, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";

const columns = [
  { name: "NAME", uid: "user" },
  { name: "DESIGNATION", uid: "designation" },
  { name: "EMPLOYEE ID", uid: "createAt" },
  { name: "STATUS", uid: "userId" },
  { name: "TASK", uid: "teamHead" },
  { name: "ACTIONS", uid: "actions" },
];

const ShowTeamMember = ({
  teamUnderEmployeeData,
}: {
  teamUnderEmployeeData: any;
}) => {
  console.log("Team Emp", teamUnderEmployeeData);

  const renderCell = React.useCallback((empData: any, columnKey: React.Key) => {
    const cellValue = empData[columnKey as any];

    switch (columnKey) {
      case "user":
        return (
          <div className="text-bold text-lg capitalize text-default-400">
            <h1>{empData?.user?.name || "N/A"}</h1>
          </div>
        );
      case "designation":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-lg capitalize text-default-400">
              {empData?.designation}
            </p>
          </div>
        );
      case "createAt":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-lg capitalize primaryColor">
              {empData?.user?.empId}
            </p>
          </div>
        );
      case "userId":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-lg capitalize text-[#028355]">
              Status
            </p>
          </div>
        );
      case "teamHead":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-lg capitalize text-[#028355]">3</p>
          </div>
        );

      case "actions":
        return (
          <div className=" w-full relative flex justify-center items-center gap-2">
            <Tooltip content="Details">
              <Link href={`/modaretor/team/${empData?.id}`}>
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon />
                </span>
              </Link>
            </Tooltip>
            <Tooltip content="Assign Projects">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Removed Employee">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <Trash />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  if (!teamUnderEmployeeData) {
    return <h1>Loading...</h1>;
  }
  const empData = teamUnderEmployeeData;

  return (
    <div className=" mt-6">
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
        <TableBody items={empData}>
          {(item) => (
            //@ts-ignore
            <TableRow key={item.id || item.userId}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ShowTeamMember;
