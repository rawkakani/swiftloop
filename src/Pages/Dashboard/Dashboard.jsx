import * as React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import DashboardHome from "./DashboardHome";
import TaskManagement from "./TaskManagement";
import "./DashboardStyles.css";

const Dashboard = ({props}) => {
  return (
    <>
      <div className="div">
        <div className="div-2">
          {/* Sidebar goes here */}
          <Sidebar />
          {/* <DashboardHome /> */}
          <TaskManagement />
        </div>
      </div>
    </>
  );
}

export default Dashboard
