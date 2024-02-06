import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import DashboardHome from "./DashboardHome";
import TaskManagement from "./TaskManagement";
import "./DashboardStyles.css";
import { getCurrentUser, getTeams } from "../../API/apiCalls";
import { auth, db } from "../../Firebase/Firebase";
import {
  onAuthStateChanged
} from "firebase/auth";
import {
  doc,
  getDoc,
} from "firebase/firestore";

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("Home");
  const [userEmail, setUser] = useState();
  const [teams, setTeams] = useState([{ name: "Swift" }]);

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  // useEffect(() => {
  //   getTeams(setTeams, userEmail);
  // }, [userEmail]);

  useEffect(() => {
    console.log(teams)
  }, [teams]);

  const getUserDetails = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

        setUser(user.email);
        getTeams(setTeams, user.email);
        console.log(user.email)
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  };

  const getTeams = async(setTeams, user) => {
    const teamMemberDocRef = doc(db, "teamMember", user);
    const teamMemberDoc = await getDoc(teamMemberDocRef);
    setTeams(teamMemberDoc.data().teams);
  }

  return (
    <>
      <div className="dashboard-container">
        <div className="div-2">
          {/* Sidebar goes here */}
          <Sidebar onTabClick={handleTabClick} />

          {/* Render component based on the selected tab */}
          {selectedTab === "Home" && <DashboardHome user={userEmail} teams={teams[0].id}/>}
          {selectedTab === "Tasks" && <TaskManagement teams={teams[0].name} />}
          {/* More tabs to be continue */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
