"use client";
import AddTeamMember from "@/components/ModaretorDashboardComponent/TeamMagement/AddTeamMember";
import ShowTeamMember from "@/components/ModaretorDashboardComponent/TeamMagement/ShowTeamMember";
import {
  useGetTeamLeadOwnDataQuery,
  useGetTeamLeadUnderAllEmployeeQuery,
} from "@/components/Redux/TeamApi/teamApi";
import { Search } from "lucide-react";
import React from "react";

const TeamMemberPage = () => {
  const { data, isLoading } = useGetTeamLeadOwnDataQuery({});
  const { data: teamEmployeeData, isLoading: teamEmployeeLoading } =
    useGetTeamLeadUnderAllEmployeeQuery({});

  if (isLoading && teamEmployeeLoading) {
    <h1>Loading</h1>;
  }

  const teamInformation = data?.data;
  const teamUnderEmployeeData = teamEmployeeData?.data;

  return (
    <div className=" bg-white p-10">
      <h1 className=" text-3xl primaryColor font-semibold">
        Team- {teamInformation?.name}
      </h1>
      <div className=" flex justify-between mt-2">
        <div className=" flex items-center gap-4">
          <AddTeamMember teamInformation={teamInformation} />
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
        <h1 className="text-xl primaryColor">
          Running Project: CRM Development
        </h1>
      </div>

      <div>
        <ShowTeamMember teamUnderEmployeeData={teamUnderEmployeeData} />
      </div>
    </div>
  );
};

export default TeamMemberPage;
