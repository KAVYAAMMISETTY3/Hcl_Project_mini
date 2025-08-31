import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Library Management</h1>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/user-Login">UserLogin</Link>
        <Link to="/admin-Login">AdminLogin</Link>
        <Link to="/register">Register</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}

export default Navbar;
