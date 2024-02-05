import React, { useState, useEffect } from "react";
import {db } from "../../Firebase/Firebase";
import { collection, getDocs } from "firebase/firestore";
import "./Board.css";

const Board = ({ teamId, userId }) => {
  const dummyUser = {
    userId: "user123",
    userName: "John Doe",
    userRole: "Developer",
  };

  // Dummy task data
  const dummyTasks = [
    {
      taskId: "task001",
      teamId: "team123",
      taskName: "TSK-1",
      taskDescription:
        "This is the description for Task 1. I have no clue what to do with this bug but well I got you and the intern",
      dueDate: "DEC 04",
      priority: "High",
      assignedTo: "John Doe",
      taskStatus: "pending",
      user: dummyUser,
    },

    {
      taskId: "task004",
      teamId: "team123",
      taskName: "TSK-4",
      taskDescription: "This is the description for Task 1.",
      dueDate: "DEC 04",
      priority: "High",
      assignedTo: "John Doe",
      taskStatus: "pending",
      user: dummyUser,
    },

    {
      taskId: "task002",
      teamId: "team123",
      taskName: "TSK-2",
      taskDescription:
        "This is the description for Task 2. well whta counts is that all this are now dynamic",
      dueDate: "DEC 06",
      priority: "Medium",
      assignedTo: "John Doe",
      taskStatus: "wip",
      user: dummyUser,
    },
    {
      taskId: "task003",
      teamId: "team123",
      taskName: "TSK-3",
      taskDescription:
        "This is the description for Task 3. shitty like but well its somthing ",
      dueDate: "DEC 04",
      priority: "Low",
      assignedTo: "John Doe",
      taskStatus: "backlog",
      user: dummyUser,
    },
    {
      taskId: "task004",
      teamId: "team123",
      taskName: "TSK-4",
      taskDescription: "This is the description for Task 4.",
      dueDate: "DEC 09",
      priority: "High",
      assignedTo: "John Doe",
      taskStatus: "closed",
      user: dummyUser,
    },
  ];


  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksCollection = collection(db, "tasks");
        const tasksSnapshot = await getDocs(tasksCollection);

        const tasksData = tasksSnapshot.docs
          .filter((doc) => doc.data().teamId === teamId && doc.data().assignedTo === userId)
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    };

    fetchTasks();
  }, [teamId, userId]);




  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleActionButtonClick = (task) => {
    setSelectedTask(task);
    setSelectedOption(null); // Reset selected option when button is clicked
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleConfirmation = () => {
    // Perform the update of task status based on the selected option
    // For example, you can call an API or update the task in the state
    // Once the update is successful, you can close the confirmation pop-up
    // and reset the selected task and option
    console.log(`Updating task ${selectedTask.taskId} status to ${selectedOption}`);
    setSelectedTask(null);
    setSelectedOption(null);
  };

  const renderTasksByStatus = (status) => {
    const filteredTasks = dummyTasks.filter(
      (task) => task.taskStatus === status
    );

    return filteredTasks.map((task) => (
      <div key={task.taskId} className="task-card">
        <div className="task-card-header">
          <div>
           
            <span>
            
              <button className="round-orange"> </button>
            </span>
            <span>{task.taskName}</span>
          </div>
          <div> {task.dueDate} </div>
        </div>

        <div className="task-desc"> {task.taskDescription} </div>

        <div className="task-card-footer">
          <button className="action-button" onClick={() => handleActionButtonClick(task)} > Status</button>
          <div> {task.priority} </div>
        </div>


        {selectedTask === task && (
          <div className="confirmation-popup">
            <p>Select an option:</p>
            <select value={selectedOption} onChange={(e) => handleOptionSelect(e.target.value)}>
              <option value="backlog">Move to Backlog</option>
              <option value="closed">Close Task</option>
            </select>
            <button onClick={handleConfirmation}>Confirm</button>
          </div>
        )}
     
      </div>




    ));
  };

  return (
    <div className="tasks-container">
      <div className="pending-container">
        <h2>Pending Tasks</h2>
        {renderTasksByStatus("pending")}
      </div>

      <div className="wip-container">
        <h2>Work in Progress</h2>
        {renderTasksByStatus("wip")}
      </div>
      <div className="backlog-container">
        <h2>Backlog</h2>
        {renderTasksByStatus("backlog")}
      </div>

      {/* <div className="closed-container">
        <h2>Closed Tasks</h2>
        {renderTasksByStatus('closed')}
      </div> */}
    </div>
  );
};

export default Board;
