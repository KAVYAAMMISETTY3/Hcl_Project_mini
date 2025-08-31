import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Auth.css';
import Navbar from '../../components/Navbar';

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = { email, password };

    try {
      const response = await axios.post('http://localhost:8081/users/login', loginData);
      const user = response.data;

      if (user.role !== 'USER') {
        alert("Access denied. You are not registered as a user.");
        return;
      }
      localStorage.setItem('loggedInUser', JSON.stringify(user)); 

      alert("User login successful!");
      navigate('/user-dashboard');
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data || "Login failed");
    }
  };

  return (
    <>
    <Navbar/>
    <div className="auth-container">
      <h2>User Login</h2>
      <form className="auth-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>Don't have an account? <a href="/register">Register</a></p>
      </form>
    </div>
    </>
  );
}

export default UserLogin;



