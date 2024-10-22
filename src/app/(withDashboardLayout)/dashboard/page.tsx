import React from "react";

const UserDashbord = () => {
  return (
    <div>
      <div className=" grid grid-cols-1 nd:grid-cols-2 xl:grid-cols-3 xl:overflow-auto  gap-10 pb-4">
        <div className=" md:row-span-2 xl:row-span-2  bg-white">
          <div className=" text-[#0c9ecf] py-8 text-center font-semibold text-2xl space-y-2">
            <h1>Total Application</h1>
            <h1>123</h1>
          </div>
        </div>
        <div className=" md:row-span-2 xl:row-span-2  text-[#0c9ecf] bg-gray-200">
          <div className="  py-8 text-center font-semibold text-2xl space-y-2">
            <h1>Total Application</h1>
            <h1>123</h1>
          </div>
        </div>
        <div className=" md:row-span-2 xl:row-span-2  text-[#0c9ecf] bg-gray-200">
          <div className="  py-8 text-center font-semibold text-2xl space-y-2">
            <h1>Total Application</h1>
            <h1>123</h1>
          </div>
        </div>
        <div className=" row-span-3 xl:row-span-6 text-[#0c9ecf] bg-gray-200"></div>
        <div className=" row-span-3 xl:row-span-6 text-[#0c9ecf] bg-gray-200"></div>
        <div className=" row-span-2 xl:row-span-3 cols-span-1 md:col-span-2 xl:col-span-1 text-[#0c9ecf] bg-gray-200"></div>
        <div className="row-span-3  text-[#0c9ecf] bg-gray-200"></div>
      </div>
    </div>
  );
};

export default UserDashbord;
