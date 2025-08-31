import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Auth.css';
import Navbar from '../components/Navbar';

function Register() {
  const [role, setRole] = useState('user');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const userData = {
      name,
      email,
      password,
      role: role.toUpperCase() // "USER" or "ADMIN"
    };

    try {
      await axios.post('http://localhost:8081/users/register', userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      alert("Registration successful!");

      // Redirect based on role
      if (role === 'admin') {
        navigate('/admin-login');
      } else {
        navigate('/user-login');
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response && error.response.data) {
        alert(`Error: ${error.response.data}`);
      } else {
        alert("Registration failed. Please try again.");
      }
    }
  };

  return (
    <>
    <Navbar/>
    <div className="auth-container">
      <h2>Register as {role === 'admin' ? 'Admin' : 'User'}</h2>
      <form className="auth-form" onSubmit={handleRegister}>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
        <p>Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
    </>
  );
}

export default Register;
