import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HelpDesk from './pages/HelpDesk';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HelpDesk />} />
        <Route path='/admin' element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
