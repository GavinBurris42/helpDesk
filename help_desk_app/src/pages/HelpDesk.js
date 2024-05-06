import React from 'react';
import { useNavigate } from 'react-router-dom';
import TicketForm from '../TicketForm';

function HelpDesk() {
  const navigate = useNavigate();

  const handleNaviagtion = () => { navigate('/admin'); };

  return (
    <div>
      <h1>Help Desk Ticket Submission</h1>
      <TicketForm />
      <button onClick={handleNaviagtion}>Admin Panel</button>
    </div>
  );
}

export default HelpDesk;