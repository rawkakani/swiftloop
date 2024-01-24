import React, {useState} from 'react';
import Hero from '../../Components/Hero/Hero';
import './HomePage.css';
import Header from '../../Components/Header/Header';
import ModalView from '../../Components/Modal/Modal';
import { signUp } from '../../API/apiCalls';

const Homepage = () => {

  const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [isAccount, setIsAccount] = useState(false);


    const handleSubscribe = (e) => {
      e.preventDefault();
      signUp(email, process.env.REACT_APP_DEFAULT_PASSWORD, setError, setEmail, setIsAccount);
      openModal();
    }

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className='HomePage'>
        <Header openModal={openModal}/>
        <Hero email={email} setEmail={setEmail} error={setError} handleSubscribe={handleSubscribe}/>
        <ModalView afterOpenModal={afterOpenModal} closeModal={closeModal} modalIsOpen={modalIsOpen} subtitle={subtitle} email={email} setEmail={setEmail} error={setError} handleSubscribe={handleSubscribe} isAccount={isAccount} />
    </div>
  )
}

export default Homepage;