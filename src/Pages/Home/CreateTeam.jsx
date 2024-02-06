import React, { useState } from "react";
import Hero from "../../Components/Hero/Hero";
import Header from "../../Components/Header/Header";
import "./HomePage.css";
import { signUp, createTeam, addTeamMember } from "../../API/apiCalls";
import logo from "../../Assets/logo.svg";
import Signup from "../../Components/Modal/Signup";
import { Link } from "react-router-dom";
import CreateTeam from "../../Components/Modal/CreateTeam";

const CreateTeamPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [isAccount, setIsAccount] = useState(false);
  const [hasTeam, setHasTeam] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamId, setTeamId] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    signUp(
      email,
      process.env.REACT_APP_DEFAULT_PASSWORD,
      setError,
      setEmail,
      setIsAccount
    );
    openModal();
  };

  const handleCreateTeam = (teamName) => {
    createTeam(teamName, email, setHasTeam, setTeamId);
  };

  const handleAddTeamMember = (email, setEmail) => {
    addTeamMember(teamId, email, setEmail, teamName);
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(true);

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="HomePage">
      <Header />
      <Hero
        email={email}
        setEmail={setEmail}
        error={setError}
        handleSubscribe={handleSubscribe}
      />

      <div className="overlay">
        <div className="card2">
        <Link to="/">Go back to Home</Link>
        <div className="modal-header">
          <img src={logo} alt="logo" />
        </div>
          <CreateTeam teamName={teamName} setTeamName={setTeamName} handleCreateTeam={handleCreateTeam} />
          <Link to="/signin">Skip</Link>
        </div>

        
      </div>
    </div>
  );
};

export default CreateTeamPage;