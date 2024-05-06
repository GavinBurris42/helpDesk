import React from 'react';
import { useNavigate } from 'react-router-dom';
import TicketManager from '../TicketManager.js';

function AdminPanel() {
  const navigate = useNavigate();

  const handleNaviagtion = () => { navigate('/'); };

  return (
    <div>
      <h1>Admin Panel</h1>
      <TicketManager />
      <button onClick={handleNaviagtion}>Help Desk</button>
    </div>
  );
}

export default AdminPanel;