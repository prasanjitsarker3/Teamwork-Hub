/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useCreateNewTeamMutation,
  useGetAllTeamLeadQuery,
} from "@/components/Redux/TeamApi/teamApi";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { CloudUpload } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const CreateNewTeam = () => {
  const { data, isLoading } = useGetAllTeamLeadQuery({});
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [createTeam, { isLoading: Createing }] = useCreateNewTeamMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Creating...");
    const formData = new FormData();
    const { photo, ...dataWithoutFiles } = data;
    formData.append("data", JSON.stringify(dataWithoutFiles));
    if (photo.length > 0) {
      formData.append("file", photo[0]);
    }

    try {
      const res = await createTeam(formData);
      if (res?.data?.statusCode === 200) {
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

  const teamMember = data?.data || [];

  return (
    <div>
      <button
        onClick={onOpen}
        className="bg-[#0c9ecf] text-white py-1 px-6 text-lg font-semibold rounded-md"
      >
        Create New Team
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
                    Create New Team
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
                    {errors.photo?.message && (
                      <span className="text-red-500">
                        {errors.photo.message as string}
                      </span>
                    )}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold">Name</label>
                      <Input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        className=" border border-gray-200 bg-white rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Enter name"
                      />
                      {errors.name?.message && (
                        <span className="text-red-500">
                          {errors.name.message as string}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                      <label className="text-sm font-semibold">
                        Team Field
                      </label>
                      <Input
                        type="text"
                        {...register("field", {
                          required: "Field is required",
                        })}
                        className="border border-gray-200 bg-white rounded-lg focus:outline-none focus:border-blue-500 "
                        placeholder="Enter Field"
                      />
                      {errors.field?.message && (
                        <span className="text-red-500">
                          {errors.field.message as string}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                      <label className="text-sm font-semibold">
                        Select Team Head
                      </label>
                      <Select
                        size="md"
                        label="Select Team Head"
                        className="w-full"
                        {...register("teamHeadId", {
                          required: "Team Head is required",
                        })}
                      >
                        {teamMember.map((item: any) => (
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
                  </ModalBody>
                  <ModalFooter className=" w-full mx-auto">
                    <Button
                      className="bg-[#F31260] hover:bg-[#F31260] text-white w-full"
                      onClick={onClose}
                    >
                      Close
                    </Button>
                    <Button
                      isDisabled={Createing}
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

export default CreateNewTeam;
