import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import adminImage from '../src/admin.png'; // Adjust the path based on your structure
import './NextPage.css';

function NextPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform your login logic here
    console.log('Login Attempt:', username, password, rememberMe);
    // On successful login, navigate to the Home component
    if (username === 'admin' && password === 'password') { // Replace with your actual login validation
      navigate('/home');
    } else {
      alert('Invalid login credentials');
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
