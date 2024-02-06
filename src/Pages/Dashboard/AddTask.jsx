import React, { useState, useEffect } from "react";
// import dummyData from "../../Data/DummyData";
import "./AddTask.css";
import { createTask } from "../../API/apiCalls";
import { db } from "../../Firebase/Firebase";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

const AddTask = ({ onClose, user, teams, assignies }) => {
  const [isClosed, setIsClosed] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [priority, setPriority] = useState("Critical");
  const [assignedTo, setAssignedTo] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  

  const handleCloseClick = () => {
    setIsClosed(true);
    onClose();
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    try {
      await createTask(teams, taskName, dateTime, description, priority, assignedTo, user);

      // Close the modal
      handleCloseClick();
    } catch (error) {
      console.error("Error creating task:", error.message);
    }
  };

  if (isClosed) {
    return null; // Render nothing if the component is closed
  }

  return (
    <div className="add-task-container">
      <div className="task-content">



      <div className="header-container" >
        <div className="heading" > Add Task </div>
        <div className="close-button" onClick={handleCloseClick} > X </div>
      </div>


        <form
          className="form-content"
          onSubmit={(e) => {
            handleSaveClick(e);
          }}
        >
          <div className="taskname">
            <label className="lableName">Name the task</label>
            <input
              type="text"
              name="taskName"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="name-input"
            />
          </div>

          <div className="taskname">
            <label className="labelName">Description</label>
            <textarea
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="name-input"
            />
          </div>

          <div className="timing">
            <div className="date">
              <label className="dateName">Date</label> <br />
              <input
                type="datetime-local"
                name="dateTime"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="date-input"
              />
            </div>
          </div>

          <div className="task-assign">
            <div className="prior">
              <label className="priorName">Task Priority</label>
              <select
                name="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="selection"
              >
                <option value="Priority">Critical</option>
                <option value="Priority">Medium</option>
                <option value="Priority">Low</option>
                
              </select>
            </div>
            <div className="Assign">
              <label className="startName">Assigned to</label>
              <select
                name="assignedTo"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="selection"
              >
                {assignies.map((assignee) => (
                  <option key={assignee.member} value={assignee.member}>
                    {assignee.member}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="buttons">
            <button className="save-btn" type="submit">
              Save
            </button>
            <button className="cancel-btn" onClick={handleCloseClick}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
