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
  const [isPopupVisible, setPopupVisibility] = useState(false);

  const handleActionButtonClick = (task) => {
    console.log("Button clicked for task:", task);
    setSelectedTask(task.taskId);
    setPopupVisibility(true);
    // rest of the code
  };



  const handleOptionClick = (option) => {
    console.log(selectedOption)
    setSelectedOption(option);

    const isConfirmed = window.confirm(
      `${dummyUser.userName} Confirm that you want to send ${selectedTask} to Status ${selectedOption}`
    );

    if (isConfirmed) {
      // Handle confirmation logic here if needed
      console.log("Confirmed!");
      handleConfirmation();
    } else {
      console.log("nothing!");
    }


    
    
  };

  const handleConfirmation = () => {
    // Display an alert to inform the user about the status change
    alert(`Changing status of task ${selectedTask} to ${selectedOption}`);
    setSelectedTask(null);
    setPopupVisibility(false);
  };


  const renderTasksByStatus = (status) => {
    const filteredTasks = dummyTasks.filter(
      (task) => task.taskStatus === status
    );

    return filteredTasks.map((task) => (
      <>
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

      </div>


      {isPopupVisible && selectedTask === task.taskId &&  (
            <div className="confirmation-popup">
          
            <button onClick={() => handleOptionClick("backlog")}>
              Backlog
            </button> <br/>
            <button onClick={() => handleOptionClick("pending")}>
              Todo
            </button> <br/>
            <button onClick={() => handleOptionClick("wip")}>
               In Progress
            </button>  <br/>
            <button onClick={() => handleOptionClick("closed")}>
              Closed
            </button>  <br/>
          </div>
          )}
       

</>

    ));
  };

  return (
    <div className="tasks-container">
      <div className="pending-container">
        <h3>Pending</h3>
        {renderTasksByStatus("pending")}
      </div>

      <div className="wip-container">
        <h3>Work in Progress</h3>
        {renderTasksByStatus("wip")}
      </div>
      <div className="backlog-container">
        <h3>Backlog</h3>
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
