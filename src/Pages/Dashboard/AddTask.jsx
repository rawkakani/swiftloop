import React, { useState, useEffect } from "react";
// import dummyData from "../../Data/DummyData";
import "./AddTask.css";
import { createTask } from "../../API/apiCalls";

const AddTask = ({ onClose }) => {
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
      await createTask(taskName, dateTime, priority, assignedTo);

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
    <div className="AddMain">
      <div className="content">
        <div className="close-x">
          <p className="close" onClick={handleCloseClick}>
            <span className="close-now">X</span>
          </p>
          <div className="heads">
            <h1 className="main-head">Add Task</h1>
            <small className="date-today">Today 02/02/2024</small>
          </div>
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
              <label className="dateName">Date</label>
              <input
                type="date"
                name="dateTime"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                placeholder="12/02/2022"
                className="date-input"
              />
            </div>
            <div className="start">
              <label className="startName">Start</label>
              <input
                type="time"
                defaultValue="11:00"
                placeholder="11:00"
                step="900"
                className="start-input"
              />
            </div>
            <div className="end">
              <label className="endName">End</label>
              <input
                type="time"
                placeholder="11:00"
                step="900"
                defaultValue="11:00"
                className="end-input"
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
