import React, { useState, useEffect } from "react";
import {db } from "../../Firebase/Firebase";

import { collection, getDocs } from "firebase/firestore";

const TeamList = () => {


  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        // Assuming 'teams' is the name of your collection in Firestore
        const teamsCollection = collection(db, "teams");
        const teamsSnapshot = await getDocs(teamsCollection);
        
        const teamsData = teamsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTeams(teamsData);
      } catch (error) {
        console.error("Error fetching teams:", error.message);
      }
    };

    fetchTeams();
  }, []); // Empty dependency array means this effect runs once when the component mounts



  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksCollection = collection(db, "tasks");
        const tasksSnapshot = await getDocs(tasksCollection);

        const tasksData = tasksSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    };

    fetchTasks();
  }, []);




  return (
    <div>
      <h2>Teams</h2>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>{team.name}</li>
          // You can display other team details as needed
        ))}
      </ul>

<br/>


<div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
          task-id is {task.id}    task-name is {task.name} - Assigned to: {task.assignedTo} - Status: {task.status}
            {/* You can display other task details as needed */}
          </li>
        ))}
      </ul>
    </div>


    </div>
  );
};

export default TeamList;
