import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaCog, FaBook, FaSignOutAlt } from 'react-icons/fa';
import '../../styles/UserProfile.css';

const AdminProfile = () => {
  const [admin, setAdmin] = useState({
    name: '',
    email: '',
    nickname: '',
    gender: '',
    country: '',
    language: '',
    timezone: '',
  });

  const [showDropdown, setShowDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    } else {
      navigate('/admin-login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    localStorage.setItem('loggedInAdmin', JSON.stringify(admin));
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInAdmin');
    navigate('/admin-login');
  };

  const handleDropdownClick = (action) => {
    setShowDropdown(false);
    if (action === 'admindashboard') navigate('/admin-dashboard');
    else if (action === 'settings') navigate('/admin/settings');
    
    else if (action === 'logout') handleLogout();
  };

  return (
    <>
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="brand"><h2>Library Management</h2></div>
          <div className="welcome"><h2>Welcome, {admin.name}!</h2></div>
          <div className="profile-menu">
            <button onClick={() => setShowDropdown(!showDropdown)}>My Profile ⬇</button>
            {showDropdown && (
              <div className="dropdown-menu">
                <button onClick={() => handleDropdownClick('admindashboard')}><FaTachometerAlt /> Admin Dashboard</button>
                
                <button onClick={() => handleDropdownClick('logout')}><FaSignOutAlt /> Logout</button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content">
        <div className="top-bar">
          <div>
            <h2>Profile Details: {admin.name} !</h2>
            <p>{new Date().toDateString()}</p>
          </div>
        </div>

        <div className="profile-card">
          <div className="profile-header">
              
              <div>
                <h3>{admin.name}</h3>
                <p>{admin.email}</p>
              </div>
            
            <button onClick={() => setIsEditing(!isEditing)} className="edit-btn">
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="profile-form">
              {['name', 'nickname', 'gender', 'country', 'language', 'timezone'].map((field) => (
                <div key={field}>
                  <label>{field}</label>
                  <input
                    type="text"
                    name={field}
                    value={admin[field]}
                    onChange={handleChange}
                    placeholder={`Your ${field}`}
                  />
                </div>
              ))}
              <button type="submit" className="save-btn">Save Changes</button>
            </form>
          ) : (
            <div className="profile-form">
              {['nickname', 'gender', 'country', 'language', 'timezone'].map((field) => (
                <div key={field}>
                  <p>{field}</p>
                  <p>{admin[field] || '—'}</p>
                </div>
              ))}
            </div>
          )}

          <div className="email-section">
            <h4>Email Addresses</h4>
            <p>{admin.email} — added 1 month ago</p>
            <button>+ Add Email Address</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Your Digital Library. All rights reserved.</p>
        <div className="footer-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/help">Help</a>
        </div>
      </footer>
    </>
  );
};

export default AdminProfile;
