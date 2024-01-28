import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import DashboardHome from "./DashboardHome";
import TaskManagement from "./TaskManagement";
import "./DashboardStyles.css";

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("Home");

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  return (
    <>
      <div className="div">
        <div className="div-2">
          {/* Sidebar goes here */}
          <Sidebar onTabClick={handleTabClick} />

          {/* Render component based on the selected tab */}
          {selectedTab === "Home" && <DashboardHome />}
          {selectedTab === "Tasks" && <TaskManagement />}
          {/* More tabs to be continue */}
        </div>
      </div>
    </>
  );
}

export default Dashboard
