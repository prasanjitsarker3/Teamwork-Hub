/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  useAddNewTeamMemberMutation,
  useGetAllEmployeeQuery,
} from "@/components/Redux/EmployeeApi/employeeApi";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const designationData = [
  { id: 1, name: "Frontend Developer" },
  { id: 2, name: "Backend Developer" },
  { id: 3, name: "Full Stack Developer" },
  { id: 4, name: "UI/UX Designer" },
  { id: 5, name: "DevOps Engineer" },
  { id: 6, name: "Software Tester/QA Engineer" },
];

const AddTeamMember = ({ teamInformation }: { teamInformation: any }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data, isLoading } = useGetAllEmployeeQuery({});
  const [addNewTeamMember, { isLoading: creating }] =
    useAddNewTeamMemberMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const employeeData = data?.data || [];
  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Creating...");
    const employeeData = {
      teamId: teamInformation?.id,
      ...data,
    };

    try {
      const res = await addNewTeamMember(employeeData);
      if (res?.data?.statusCode === 201) {
        toast.success(res?.data?.message, { id: toastId, duration: 1000 });
        reset();
        //@ts-ignore
        onOpenChange(false);
      } else {
        toast.error(res?.data?.message, { id: toastId, duration: 1000 });
      }
    } catch (err: any) {
      console.log(err?.message);
    }
  };
  return (
    <div>
      <button
        onClick={onOpen}
        className="bg-[#0c9ecf] text-white py-1 px-6 text-base font-semibold rounded-md"
      >
        Add Team Member
      </button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              {isLoading ? (
                <h1>Loading...</h1>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ModalHeader className="flex flex-col gap-1 text-[#0c9ecf]">
                    Add Team Member
                  </ModalHeader>
                  <ModalBody>
                    <div className="">
                      <Select
                        size="md"
                        label="Select Employee"
                        className="w-full"
                        {...register("userId", {
                          required: "Employee is required",
                        })}
                      >
                        {employeeData.map((item: any) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item?.name}
                          </SelectItem>
                        ))}
                      </Select>
                      {errors.teamHeadId?.message && (
                        <span className="text-red-500">
                          {errors.teamHeadId.message as string}
                        </span>
                      )}
                    </div>
                    <div className=" mt-2">
                      <Select
                        size="md"
                        label="Select Designation"
                        className="w-full"
                        {...register("designation", {
                          required: "Employee is required",
                        })}
                      >
                        {designationData.map((item: any) => (
                          <SelectItem key={item.name} value={item.name}>
                            {item?.name}
                          </SelectItem>
                        ))}
                      </Select>
                      {errors.teamHeadId?.message && (
                        <span className="text-red-500">
                          {errors.teamHeadId.message as string}
                        </span>
                      )}
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
                      isDisabled={creating}
                      className="bg-[#0c9ecf] hover:bg-[#0c9ecf] text-white w-full"
                      type="submit"
                    >
                      Create
                    </Button>
                  </ModalFooter>
                </form>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddTeamMember;
