"use client";
import { Bell, CloudUpload, Menu, PowerOff, Settings } from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";

import React from "react";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { setIsSidebarCollapsed } from "../Redux/State/sidebarSlice";
import { logOut } from "../Redux/State/authSlice";
import { logoutUser } from "../ServerRender/logoutUser";
import { useRouter } from "next/navigation";
import { useUserProfileDataQuery } from "../Redux/UserApi/userApi";
import { useForm } from "react-hook-form";
import Link from "next/link";

type FormValues = {
  photo: FileList; // for handling the photo upload
  designation: string;
  address: string;
};

const DashboardNavbar = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useUserProfileDataQuery({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const router = useRouter();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const handleLogOut = () => {
    dispatch(logOut());
    logoutUser(router);
  };
  if (isLoading) {
    <h1>Loading..</h1>;
  }
  const profileData = data?.data;

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
    const photoFile = data.photo[0];
    console.log("Uploaded Photo:", photoFile);

    reset();
    onClose();
  };

  return (
    <div className=" flex justify-between items-center w-full mb-7 ">
      {/* Left Side */}
      <div className=" flex  justify-between items-center gap-5">
        <button
          className=" px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className=" w-4 h-4" />
        </button>

        <div className=" relative">
          <input
            type="search"
            placeholder="Searching..."
            className=" pl-10 pr-4 py-2 w-52 md:w-72 border border-gray-200 bg-white rounded-lg focus:outline-none focus:border-blue-500 "
          />
          <div className=" absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Bell className=" text-gray-500 " size={20} />
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className=" flex justify-between items-center gap-5">
        <div className=" hidden md:flex justify-between items-center gap-5 ">
          <div className=" relative ">
            <Bell className=" cursor-pointer text-gray-500 " size={24} />
            <span className=" absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full">
              3
            </span>
          </div>
          <hr className=" w-0 h-7 border border-solid border-l border-gray-300" />
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform w-8 h-8"
                src={
                  profileData?.profile?.photo ||
                  "https://cdn-icons-png.flaticon.com/128/1177/1177568.png"
                }
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold text-[#0c9ecf]">
                  {profileData?.name || "N/A"}
                </p>
                <p className="font-semibold">{profileData?.email || "N/A"}</p>
              </DropdownItem>
              <DropdownItem onPress={onOpen} key="settings">
                Edit Profile
              </DropdownItem>
              <DropdownItem key="team_settings">
                <Link href={`/${profileData?.role}/profile`}>View Profile</Link>
              </DropdownItem>
              <DropdownItem key="analytics">Change Password</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <Modal isOpen={isOpen} onOpenChange={onOpen}>
          <ModalContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1 text-[#0c9ecf]">
                Update User Profile Information
              </ModalHeader>
              <ModalBody>
                <div className="flex items-center space-x-3 w-full">
                  <label
                    htmlFor="photo-upload"
                    className="cursor-pointer w-full flex items-center space-x-2 p-3  rounded-md bg-gray-100 hover:bg-gray-200"
                  >
                    <CloudUpload size={24} className="text-gray-600" />{" "}
                    <span className="text-gray-600">Upload Photo</span>
                  </label>
                  <Input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    {...register("photo", {
                      required: "Profile photo is required",
                    })}
                    className="hidden"
                  />
                </div>
                {errors.photo && (
                  <span className="text-red-500">{errors.photo.message}</span>
                )}
                <Input
                  size="lg"
                  placeholder="Designation"
                  {...register("designation", {
                    required: "Designation is required",
                  })}
                  className="mb-4"
                />
                {errors.designation && (
                  <span className="text-red-500">
                    {errors.designation.message}
                  </span>
                )}
                <Textarea
                  placeholder="Present Address"
                  rows={4}
                  {...register("address", {
                    required: "Address is required",
                  })}
                />
                {errors.address && (
                  <span className="text-red-500">{errors.address.message}</span>
                )}
              </ModalBody>
              <ModalFooter className=" w-full items-center">
                <Button
                  size="sm"
                  className="bg-[#F31260] text-white w-full"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  size="sm"
                  className="bg-[#0c9ecf] text-white w-full"
                  type="submit"
                >
                  Save Changes
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
        <Dropdown>
          <DropdownTrigger>
            <div className=" px-2 py-2  rounded-full bg-[#0c9ecf] text-white">
              <Settings className=" cursor-pointer  " size={20} />
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="new">New file</DropdownItem>
            <DropdownItem key="copy">Copy link</DropdownItem>
            <DropdownItem key="edit">Edit file</DropdownItem>
            <DropdownItem
              onClick={handleLogOut}
              key="delete"
              className=" flex items-center bg-[#F31260] text-white"
              color="danger"
            >
              <h1 className="flex text-base items-center gap-2">
                {" "}
                Logout <PowerOff size={16} />
              </h1>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default DashboardNavbar;
