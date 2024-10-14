import { useState } from 'react';
import './SignUp.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Ensure this is imported

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Ensure this is used for navigation

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    axios.post('http://localhost:8000/api/signup/', {
      username: username,
      email: email,
      phone: phone,
      password: password,
    })
      .then(response => {
        console.log(response.data);
        // If registration is successful, redirect to login page
        navigate('/login'); 
      })
      .catch(error => {
        if (error.response) {
          // Server responded with a status other than 2xx
          console.log(error.response.data);
          // Display error message if email/username already exists
          if (error.response.data.error === "Email or username already exists") {
            setError("Email or username already exists");
          } else {
            setError(error.response.data.error);
          }
        } else if (error.request) {
          // Request was made but no response was received
          console.log(error.request);
          setError('No response from server');
        } else {
          // Something else happened while setting up the request
          console.log('Error', error.message);
          setError('An error occurred');
        }
      });
  }

  return (
    <div className='signup_container'>
      <div className="wrapper">
        <h2>Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="input-box button">
            <input type="submit" value="Register Now" />
          </div>
          <div className="text">
            <h3>
              Already have an account? <a href="/login">Login now</a>
            </h3>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
