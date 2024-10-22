/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import CreateTeamLead from "@/components/AdminDashboardRoute/UserManagement/CreateTeamLead";
import {
  useDeleteUserMutation,
  useGetAllProfileDataQuery,
  useSingleUserStatusRoleUpdateMutation,
} from "@/components/Redux/UserApi/userApi";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Select,
  SelectItem,
  Pagination,
} from "@nextui-org/react";

import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { EditIcon, EyeIcon, Search, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const columns = [
  { name: "PROFILE", uid: "name" },
  { name: "NAME", uid: "email" },
  { name: "ROLE", uid: "role" },
  { name: "STATUS", uid: "status" },
  { name: "JOIN DATE", uid: "createdAt" },
  { name: "ACTIONS", uid: "actions" },
];

const statusColorMap = {
  ACTIVE: "success",
  DELETED: "danger",
  BLOCKED: "warning",
};

const roles = [
  { key: "admin", label: "Admin" },
  { key: "modaretor", label: "Team Lead" },
  { key: "user", label: "Employee" },
];

const statuses = [
  { key: "ACTIVE", label: "Active" },
  { key: "BLOCKED", label: "Blocked" },
  { key: "DELETED", label: "Deleted" },
];

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  profile: {
    photo: string;
    designation?: string;
  };
}

const UserManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const query: Record<string, any> = {
    searchTerm,
    page,
    limit,
  };

  const { data, isLoading } = useGetAllProfileDataQuery(query);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [updateProfileData] = useSingleUserStatusRoleUpdateMutation();
  const [deleteUser] = useDeleteUserMutation();

  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      role: "",
      status: "",
    },
  });

  useEffect(() => {
    if (selectedUser) {
      setValue("role", selectedUser.role);
      setValue("status", selectedUser.status);
    }
  }, [selectedUser, setValue, isOpen]);

  const handleDeleteUser = async (id: string) => {
    const res = await deleteUser(id);
    console.log(res);
    if (res?.data?.statusCode === 200) {
      toast.success(res?.data?.message);
    } else {
      toast.error(res?.data?.message);
    }
  };

  const renderCell = React.useCallback(
    (userManageData: any, columnKey: React.Key) => {
      const cellValue = userManageData[columnKey as any];

      switch (columnKey) {
        case "name":
          return (
            <div>
              <div className=" w-14 h-14 ">
                <Image
                  src={
                    userManageData?.profile?.photo ||
                    "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid"
                  }
                  alt=""
                  height={80}
                  width={80}
                  className=" h-full w-full rounded-full"
                />
              </div>
            </div>
          );
        case "email":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-lg capitalize primaryColor">
                {userManageData?.name}
              </p>
              <p className="text-bold text-lg capitalize text-default-400">
                {userManageData?.email}
              </p>
            </div>
          );
        case "role":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-lg capitalize primaryColor">
                {userManageData?.profile?.designation || "N/A"}
              </p>
              <p className="text-bold text-lg capitalize text-default-400">
                {userManageData?.role == "admin"
                  ? "ADMIN"
                  : userManageData?.role == "modaretor"
                  ? "Team Lead"
                  : userManageData?.role == "user"
                  ? "Employee"
                  : null}
              </p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize  border-none gap-1 text-default-600"
              //@ts-ignore
              color={statusColorMap[userManageData?.status]}
              size="lg"
              variant="dot"
            >
              {cellValue}
            </Chip>
          );
        case "createdAt":
          return (
            <h3 className="text-lg text-gray-500 ">
              {new Date(userManageData?.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </h3>
          );

        case "actions":
          return (
            <div className=" w-full relative flex justify-center items-center gap-2">
              <Tooltip content="Details">
                <Link href={`/admin/user/${userManageData.id}`}>
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EyeIcon />
                  </span>
                </Link>
              </Tooltip>
              <Tooltip content="Edit user">
                <span
                  onClick={() => {
                    setSelectedUser(userManageData);
                    onOpen();
                  }}
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <span
                  onClick={() => handleDeleteUser(userManageData?.id)}
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
    return <h1>Loading...</h1>;
  }

  const userManageData = data?.data?.data || [];
  const metaData = data?.data?.meta;
  const total = metaData?.total || 0;
  const countPage = Math.ceil(total / limit);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  console.log("User Information", userManageData);

  const submitForm = async (formData: any) => {
    const toastId = toast.loading("Updating...");
    try {
      const updateData = {
        role: formData.role,
        status: formData.status,
      };

      const res = await updateProfileData({
        id: selectedUser?.id as string,
        updateData,
      });
      if (res?.data?.statusCode === 200) {
        toast.success(res?.data?.message, { id: toastId, duration: 1000 });
        reset();
        //@ts-ignore
        onOpenChange(false);
      } else {
        toast.error(res?.data?.message, { id: toastId, duration: 1000 });
      }
      console.log("Reponsive", res);
    } catch (err: any) {
      console.log(err?.message);
    }
  };

  return (
    <div className=" p-10 bg-white rounded-2xl">
      <div className="flex items-center space-x-5  mb-8">
        <CreateTeamLead />
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
        <TableBody items={userManageData}>
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

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 primaryColor">
                Update User Role and Status
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(submitForm)}>
                  <Select
                    size="sm"
                    label="Select a role"
                    {...register("role")}
                    className="w-full"
                  >
                    {roles.map((role) => (
                      <SelectItem key={role.key} value={role.key}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    size="sm"
                    label="Select status"
                    {...register("status")}
                    className="w-full mt-6"
                  >
                    {statuses.map((status) => (
                      <SelectItem key={status.key} value={status.key}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </Select>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  //@ts-ignore
                  onPress={handleSubmit(submitForm)}
                >
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UserManagementPage;
