import React, { useState } from "react";
import "./StandUp.css";
import { createStandup } from "../../API/apiCalls";

const StandUp = ({ onClose, user, teams }) => {
  const [sendNotification, setSendNotification] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [standupName, setStandupName] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dateTime, setDateTime] = useState("");

  const handleCloseClick = () => {
    setIsClosed(true);
    onClose();
  };

  const handleSaveClick = async () => {
    try {
      const teamId = {teamId}; // Replace with your actual teamId
      await createStandup(teams, taskName, description, assignedTo, dateTime, user);
    } catch (error) {
      console.error('Error creating standup:', error.message);
    }
  };

  const handleToggleNotification = () => {
    setSendNotification(!sendNotification);
  };

  if (isClosed) {
    return null;
  }

  return (
    <div className="standup-container">
      <div className="standup-content">
        <div className="header-container">
          <div className="heading"> Quick Standup </div>
          <div className="close-button" onClick={handleCloseClick}>
            {" "}
            X{" "}
          </div>
        </div>

        <form className="form-content">
          <div className="taskname">
            <label className="labelName">Standup Name</label>
            <input
              type="text"
              name="standupName"
              value={standupName}
              onChange={(e) => setStandupName(e.target.value)}
              className="name-input"
              style={{ marginBottom: '10px' }}
            />
          </div>

          <div className="taskname">
            <label className="labelName">Description</label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="name-input"
            />
          </div>

          <div className="task-assign">
            <div className="Assign">
              <label className="startName">Attendees</label>
              <input
                type="text"
                name="assignedTo"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                placeholder="Name surname"
                className="assign-input"
              />
            </div>
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

          <div className="notifications">
            <div className="notification">
              <p className="notification-title"> Activate Notifications </p>
              <p className="notification-desc">
                {" "}
                Standup reminder will be sent to standup attendees{" "}
              </p>
            </div>
            <div className="notification-button">
              <input
                type="checkbox"
                checked={sendNotification}
                onChange={handleToggleNotification}
              />
            </div>
          </div>

          <div className="buttons">
            <button className="save-btn" onClick={handleSaveClick}>
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

export default StandUp;
