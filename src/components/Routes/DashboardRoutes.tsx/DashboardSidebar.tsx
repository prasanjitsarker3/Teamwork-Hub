"use client";
import React from "react";
import { Menu } from "lucide-react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/components/Redux/hooks";
import { setIsSidebarCollapsed } from "@/components/Redux/State/sidebarSlice";
import { dashboardRoutes } from "./dashboard.routes";
import SidebarLink from "./SidebarLink";

const DashboardSidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassNames}>
      {/* Top Logo */}
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapsed ? "px-5" : "px-8"
        }`}
      >
        <Image
          src={"https://cdn-icons-png.flaticon.com/128/4344/4344252.png"}
          alt="Logo"
          width={30}
          height={30}
        />
        <h1
          className={`${
            isSidebarCollapsed ? "hidden" : "block"
          } font-extrabold text-xl text-[#0c9ecf]`}
        >
          Blind Archer
        </h1>
        <button
          className="md:hidden px-3 py-3 bg-gray-300 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* Links */}
      <div className="flex-grow mt-8">
        {dashboardRoutes.map((route, index) => (
          <SidebarLink
            key={index}
            href={route.href}
            icon={route.icon}
            label={route.label}
            isCollapsed={isSidebarCollapsed}
          />
        ))}
      </div>

      {/* Footer */}
      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
        <p className="text-center text-sm text-gray-500">
          &copy; 2024 Blind Archer
        </p>
      </div>
    </div>
  );
};

export default DashboardSidebar;
