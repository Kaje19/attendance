import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import adminImage from '../src/admin.png'; // Adjust the path based on your structure
import './NextPage.css';
import axios from 'axios';

function NextPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3001/api/login', { username, password });
      console.log('Login Attempt:', username, password, rememberMe);
    // On successful login, navigate to the Home component
      if (response.data.success) {
        navigate('/home');
      } else {
        alert('Invalid login credentials');
      }
    } catch(error) {
      console.error('Error: ', error);
    }
  
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src={adminImage} alt="Admin Login" />
      </div>
      <div className="login-form-container">
        <h1>ADMIN LOG IN!</h1>
        <p>Please login to continue</p>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
          />
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
            />
            Remember me
          </label>
          <button type="submit">LOG IN</button>
        </form>
      </div>
    </div>
  );
}

export default NextPage;
