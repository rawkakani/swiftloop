import React, { useState, useEffect } from "react";
// import dummyData from "../../Data/DummyData";
import "./AddTask.css";
import { createTask } from "../../API/apiCalls";
import { db } from "../../Firebase/Firebase";
import { collection, getDocs } from "firebase/firestore";

const AddTask = ({ onClose, user, teams }) => {
  const [isClosed, setIsClosed] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [priority, setPriority] = useState("Critical");
  const [assignedTo, setAssignedTo] = useState("");
  const [tasks, setTasks] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [assignies, setAssignies] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'tasks'));
        const fetchedTasks = querySnapshot.docs.map((doc) => doc.data());
  
        setTasks(fetchedTasks);
  
        const uniqueAssignies = [
          ...new Set(fetchedTasks.map((assign) => assign.assignedTo)),
        ];
        setAssignies(uniqueAssignies);
  
        const uniquePriorities = [
          ...new Set(fetchedTasks.map((task) => task.priority)),
        ];
        setPriorities(uniquePriorities);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
  
    getData();
  }, []);
  

  const handleCloseClick = () => {
    setIsClosed(true);
    onClose();
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    try {
      await createTask(teams, taskName, dateTime, priority, assignedTo, user);

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
                <option value="">Select</option>
                {priorities.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
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
                <option value="">Select</option>
                {assignies.map((a) => (
                  <option key={a} value={a}>
                    {a}
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
