"use client";
import { useGetTeamLeadOwnDataQuery } from "@/components/Redux/TeamApi/teamApi";
import React from "react";

const Moderator = () => {
  const { data, isLoading } = useGetTeamLeadOwnDataQuery({});
  if (isLoading) {
    <h1>Loading</h1>;
  }
  const teamInformation = data?.data;
  console.log(teamInformation);

  return (
    <div>
      <h1>Team :{teamInformation?.name}</h1>
    </div>
  );
};

export default Moderator;
