import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        email: email,
        password: password
      });

      if (response.data.success) {
        // If login is successful, redirect to home or dashboard
        navigate('/home');
      } else {
        // Display error message from the response
        setError(response.data.message);
      }
    } catch (error) {
      // Handle errors like incorrect credentials or server issues
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login_container">
      <div className='wrapper'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <label>Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="input-box button">
          <input type="submit" value="Login" />
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;
