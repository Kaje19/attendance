import React from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import './App.css';
import logo from './logo.svg';
import Home from './Home'; // Import the Home component from src directory
import NextPage from './NextPage'; // Import the new page component

function App() {
  const navigate = useNavigate();

  const handlePageClick = () => {
    navigate('/next');
  };

  return (
    <Routes>
      <Route path="/" element={
        <div className="App" onClick={handlePageClick}>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="College of Computer Studies Logo" />
            <div className="title">THE CONFEDERATE STUDENT COUNCIL ADMIN ATTENDANCE TRACKER</div>
          </header>
        </div>
      }/>
      <Route path="/next" element={<NextPage />} />
      <Route path="/home" element={<Home />} /> {/* Add the route for Home */}
    </Routes>
  );
}

export default App;
