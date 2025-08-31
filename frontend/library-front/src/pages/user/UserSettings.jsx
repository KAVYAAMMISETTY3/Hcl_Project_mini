import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaCog, FaBook, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';
import '../../styles/UserSettings.css';

const UserSettings = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    language: 'English',
    notifications: true,
  });

  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/user-login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    alert('Settings saved successfully!');
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/user-login');
  };

  const handleDropdownClick = (action) => {
    setShowDropdown(false);
    if (action === 'profile') navigate('/user/profile');
    else if (action === 'settings') navigate('/user/settings');
    else if (action === 'borrowed') navigate('/user/borrowed-books');
    else if (action === 'userdashboard') navigate('/user/dashboard');
    else if (action === 'logout') handleLogout();
  };

  return (
    <>
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="brand"><h2>Library Management</h2></div>
          <div className="welcome"><h2>Welcome, {user.name}!</h2></div>
          <div className="profile-menu">
            <button onClick={() => setShowDropdown(!showDropdown)}>My Profile ⬇</button>
            {showDropdown && (
              <div className="dropdown-menu">
                <button onClick={() => handleDropdownClick('profile')}><FaUser /> Profile</button>
                <button onClick={() => handleDropdownClick('settings')}><FaCog /> Settings</button>
                <button onClick={() => handleDropdownClick('borrowed')}><FaBook /> Borrowed Books</button>
                <button onClick={() => handleDropdownClick('userdashboard')}><FaTachometerAlt /> User Dashboard</button>
                <button onClick={() => handleDropdownClick('logout')}><FaSignOutAlt /> Logout</button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Settings Content */}
      <div className="settings-container">
        <h2>User Settings</h2>
        <div className="settings-form">
          <label>Name:
            <input type="text" name="name" value={user.name} onChange={handleChange} />
          </label>
          <label>Email:
            <input type="email" name="email" value={user.email} onChange={handleChange} />
          </label>
          <label>Language:
            <select name="language" value={user.language} onChange={handleChange}>
              <option>English</option>
              <option>Hindi</option>
              <option>Tamil</option>
              <option>Telugu</option>
            </select>
          </label>
          <label>
            <input
              type="checkbox"
              name="notifications"
              checked={user.notifications}
              onChange={handleChange}
            />
            Enable Notifications
          </label>
          <button onClick={handleSave}>Save Settings</button>
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

export default UserSettings;
