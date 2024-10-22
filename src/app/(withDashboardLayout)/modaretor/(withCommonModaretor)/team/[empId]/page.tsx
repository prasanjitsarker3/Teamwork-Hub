"use client";
import { useGetSingleEmployeeQuery } from "@/components/Redux/EmployeeApi/employeeApi";
import { Progress, Spinner } from "@nextui-org/react";
import { Eye } from "lucide-react";
import Image from "next/image";
import React from "react";

interface UserProfileDetailProps {
  params: {
    empId: string;
  };
}

const TeamUnderSingleEmployeeShow: React.FC<UserProfileDetailProps> = ({
  params,
}) => {
  const empId = params?.empId;
  const { data, isLoading } = useGetSingleEmployeeQuery(empId);
  if (isLoading) {
    <div className=" flex justify-center items-center pt-16">
      <Spinner size="lg" />
    </div>;
  }

  const empData = data?.data;
  console.log("Data", empData);

  return (
    <div>
      <div className=" w-full bg-[#0c9ecf] h-48"></div>
      <div className=" bg-gray-100 h-[100vh] w-[90%] mx-auto -mt-24 p-12 rounded-2xl ">
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          <div>
            <Image
              src={
                empData?.user?.profile?.photo ||
                "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?ga=GA1.1.1828852587.1722179846&semt=ais_hybrid"
              }
              alt=""
              width={300}
              height={300}
            />
          </div>
          <div className=" space-y-3">
            <h1 className="text-xl primaryColor font-bold bg-gray-200 p-1">
              {empData?.user?.name || "N/A"}
            </h1>
            <h2 className="text-xl text-gray-600 bg-gray-200 p-1">
              {empData?.user?.email || "N/A"}
            </h2>
            <h3 className="text-lg text-gray-500 bg-gray-200 p-1">
              {empData?.designation || "N/A"}
            </h3>
            <h3 className="text-lg text-gray-500 bg-gray-200 p-1">
              E-ID: {empData?.user?.empId || "N/A"}
            </h3>
          </div>
          <div className=" space-y-3">
            <h3 className="text-lg primaryColor font-bold bg-gray-200 p-1">
              {empData?.team?.name || "NA"}
            </h3>
            <h3 className="text-lg text-gray-500 bg-gray-200 p-1">
              T-H: {empData?.team?.teamHead?.name || "N/A"}
            </h3>
            <h3 className="text-lg text-gray-500 bg-gray-200 p-1">
              Performance: 87 %
            </h3>
            <h3 className="text-lg text-gray-500 bg-gray-200 p-1">
              01378856858
            </h3>
          </div>
        </div>

        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 py-8">
          <div className="text-xl primaryColor font-bold bg-gray-200 p-3 text-center">
            <h1>Complete Task</h1>
            <h1>12</h1>
          </div>
          <div className="text-xl primaryColor font-bold bg-gray-200 p-3 text-center">
            <h1>Pending Task</h1>
            <h1>4</h1>
          </div>
          <div className="text-xl primaryColor font-bold bg-gray-200 p-3 text-center">
            <h1>Due Today Task</h1>
            <h1>3</h1>
          </div>
        </div>
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 py-8">
          <div className="text-xl primaryColor font-bold bg-gray-200 p-3 text-center">
            <h1>Leave Taken </h1>
            <h1>5</h1>
          </div>
          <div className="text-xl primaryColor font-bold bg-gray-200 p-3 text-center">
            <h1>Performance</h1>
            <Progress value={87} color="primary" className=" w-60 mx-auto" />
            <p className="text-gray-500">87%</p>
          </div>
          <div className="text-xl primaryColor font-bold bg-gray-200 p-3 text-center">
            <h1>Review Task</h1>
            <Eye className="w-full flex  justify-center" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamUnderSingleEmployeeShow;
