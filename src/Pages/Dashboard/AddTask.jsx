import React, {useState} from "react";
import "./AddTask.css";

const AddTask = ({ onClose }) => {
  const [isClosed, setIsClosed] = useState(false);

  const handleCloseClick = () => {
    setIsClosed(true);
    onClose();
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

        <div className="form-content">
          <div className="taskname">
            <label className="lableName">Name the task</label>
            <input type="text" name="task_ame" className="name-input" />
          </div>

          <div className="timing">
            <div className="date">
              <label className="dateName">Date</label>
              <input type="text" name="task_ame" placeholder="12/02/2022" className="date-input" />
            </div>
            <div className="start">
              <label className="startName">Start</label>
              <input type="text" name="task_ame" placeholder="11:00 AM" className="start-input" />
            </div>
            <div className="end">
              <label className="endName">End</label>
              <input type="text" name="task_ame" placeholder="13:00 AM" className="end-input" />
            </div>
          </div>

          <div className="task-assign">
            <div className="prior">
              <label className="priorName">Task Priority</label>
              <select name="task_name" className="selection">
                <option value="select">Critical</option>
                <option value="priority2">Priority 2</option>
                <option value="priority3">Priority 3</option>
              </select>
            </div>
            <div className="Assign">
              <label className="startName">Start</label>
              <input type="text" name="task_ame" placeholder="Name surname" className="assin-input" />
            </div>
          </div>

          <div className="buttons">
            <button className="save-btn">Save</button>
            <button className="cancel-btn" onClick={handleCloseClick}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
