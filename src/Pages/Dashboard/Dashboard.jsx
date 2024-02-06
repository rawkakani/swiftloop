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
  const [teams, setTeams] = useState([{ name: "" }]);
  const [userData, setUserData] = useState({});
  const [assignies, setAssignies] = useState([]);

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  useEffect(() => {
    getUserDetails();
  }, []);


  const getTeamUsers = async (teamId) => {
    const teamMembersRef = doc(db, "teams", teamId);
  const teamMemberDoc = await getDoc(teamMembersRef);
  if (teamMemberDoc.exists()) {
    setAssignies(teamMemberDoc.data().members);
  }
  }

  const getUserDetails = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

        setUser(user.email);
        getTeams(setTeams, user.email);
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

    const userDocRef = doc(db, "users", user);
    const userDoc = await getDoc(userDocRef);
    setUserData(userDoc.data());
    setTeams(teamMemberDoc.data().teams);
    getTeamUsers(teamMemberDoc.data().teams[0].id);
  }

  return (
    <>
      <div className="dashboard-container">
        <div className="div-2">
          {/* Sidebar goes here */}
          <Sidebar onTabClick={handleTabClick} />

          {/* Render component based on the selected tab */}
          {selectedTab === "Home" && <DashboardHome user={userData.firstName} teams={teams[0].id}/>}
          {selectedTab === "Tasks" && <TaskManagement user={userEmail} teams={teams[0]} assignies={assignies} />}
          {/* More tabs to be continue */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
