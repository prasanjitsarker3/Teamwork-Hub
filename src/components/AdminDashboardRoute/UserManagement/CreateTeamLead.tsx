/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useCreateUserMutation } from "@/components/Redux/UserApi/userApi";

const CreateTeamLead = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { register, handleSubmit, reset } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [createUser, isLoading] = useCreateUserMutation();

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Creating...");
    try {
      const res = await createUser(data);
      if (res?.data?.statusCode == "201") {
        toast.success(res?.data?.message, { id: toastId, duration: 1000 });
        reset();
        //@ts-ignore
        onOpenChange(false);
      } else {
        toast.error(res?.data?.message, { id: toastId, duration: 1000 });
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <button
        onClick={onOpen}
        className="bg-[#0c9ecf] text-white py-1 px-6 text-lg font-semibold rounded-md"
      >
        Create User
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1 text-[#0c9ecf]">
                Create New User
              </ModalHeader>
              <ModalBody>
                {/* Name Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold">Name</label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    className=" px-3 py-2  border border-gray-200 bg-white rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Enter name"
                  />
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-2 mt-2">
                  <label className="text-sm font-semibold">Email</label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    className=" px-3 py-2 border border-gray-200 bg-white rounded-lg focus:outline-none focus:border-blue-500 "
                    placeholder="Enter email"
                  />
                </div>

                {/* Password Input with Toggle */}
                <div className="flex flex-col gap-2 mt-2">
                  <label className="text-sm font-semibold">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", { required: true })}
                      className=" px-3 py-2 border border-gray-200 bg-white rounded-lg focus:outline-none focus:border-blue-500 w-full"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                {/* Role Select */}
                <div className="flex flex-col gap-2 mt-2">
                  <label className="text-sm font-semibold">Role</label>
                  <select
                    {...register("role", { required: true })}
                    className=" px-3 py-2 border border-gray-200 bg-white rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="admin" className=" bg-white py-1">
                      ADMIN
                    </option>
                    <option value="modaretor" className=" bg-white py-1">
                      Team Lead
                    </option>
                    <option value="user" className=" bg-white py-1">
                      Employee
                    </option>
                  </select>
                </div>
              </ModalBody>
              <ModalFooter className=" w-full mx-auto">
                <Button
                  className="bg-[#F31260] hover:bg-[#F31260] text-white w-full"
                  onClick={onClose}
                >
                  Close
                </Button>
                <Button
                  disabled={!isLoading}
                  className="bg-[#0c9ecf] hover:bg-[#0c9ecf] text-white w-full"
                  type="submit"
                >
                  Create
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreateTeamLead;
