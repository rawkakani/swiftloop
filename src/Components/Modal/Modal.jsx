import React, { useState } from "react";
import Modal from "react-modal";
import "./Modal.css";
import logo from "../../Assets/logo.svg";
import Subscribe from "../Subscribe/Subscribe";
import { FaGoogle } from "react-icons/fa";
import AddTeam from "../AddTeam/AddTeam";

const customStyles = {
  content: {
    right: "auto",
    bottom: "auto",
    width: "90%",
    height: "90%",
    backgroundColor: "#171616",
    color: "#fff",
    borderRadius: "15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    inset: "5% auto auto 5%",
  },
};

const ModalView = ({
  afterOpenModal,
  closeModal,
  modalIsOpen,
  email,
  setEmail,
  handleSubscribe,
  isAccount,
  hasTeam,
  handleCreateTeam,
  email1,
  setEmail1,
  handleAddTeamMember,
  teamName,
  setTeamName,
}) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="modal-content">
        <div className="modal-header">
          <img src={logo} alt="logo" />
        </div>
        {!isAccount ? (
          <div className="modal-body">
            <p>
              Welcome to SwiftLoop. Your team collaboration and management tool.
              Sign up to get started
            </p>
            <Subscribe
              email={email}
              setEmail={setEmail}
              handleSubscribe={handleSubscribe}
              btnTxt="Continue"
            />
            <div className="signup-with-g">
              <span>
                <p>Or Signup with Google</p>
              </span>
              <div className="google-icon">
                <FaGoogle />
              </div>
            </div>
          </div>
        ) : (
          <div className="modal-body">
            {hasTeam ? (
              <>
                <h3>{teamName}</h3>
                <p>Add your team members now!</p>
                <div className="invite-team">
                  <AddTeam email={email1} setEmail={setEmail1} handleAddTeamMember={handleAddTeamMember} />
                </div>
                <p>Invite more</p>
              </>
            ) : (
              <>
                <p>Create your team now!</p>
                <div className="invite-team">
                  <form className="AddTeam">
                    <input
                      type="email"
                      placeholder="Enter Team Name"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                    />
                    <button type="button" onClick={() => {handleCreateTeam(teamName)}}>Create Team</button>
                  </form>
                </div>
              </>
            )}
            <button
              className="btn"
              onClick={() => {
                closeModal();
              }}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalView;
