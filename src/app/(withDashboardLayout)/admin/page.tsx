import React from "react";

const AdminDashboard = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <div className="bg-gray-100 p-6 ">Grid Item 1</div>
        <div className="bg-gray-100 p-6 ">Grid Item 2</div>
        <div className="bg-gray-100 p-6">Grid Item 3</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
