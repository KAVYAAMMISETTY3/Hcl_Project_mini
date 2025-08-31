import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/AddBookForm.css';

function AddBookForm() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    publishedDate: '',
    quantity: 1,
    available: true,
    imageUrl: '',
    description: ''
  });

  const [adminName, setAdminName] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      const admin = JSON.parse(storedAdmin);
      setAdminName(admin.name || 'Admin');
    } else {
      navigate('/admin-login', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    function onDocClick(e) {
      if (
        showDropdown &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    }
    function onKeyDown(e) {
      if (e.key === 'Escape') setShowDropdown(false);
    }
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [showDropdown]);

  const handleDropdownClick = (action) => {
    setShowDropdown(false);
    if (action === 'profile') navigate('/admin/profile');
    else if (action === 'settings') navigate('/admin/settings');
    else if (action === 'logout') {
      localStorage.removeItem('admin');
      alert('Logged out successfully!');
      navigate('/admin-login');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/api/books', formData);
      alert('Book added successfully!');
      navigate('/admin/books');
    } catch (error) {
      alert('Error adding book: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <>
      <div className="admin-dashboard">
        <header className="dashboard-header">
          <div className="header-content">
            <div className="brand"><h2>Library Management</h2></div>
            <div className="welcome"><h2>Welcome, {adminName}!</h2></div>
            <div className="profile-menu">
              <button
                ref={btnRef}
                className="profile-trigger"
                onClick={() => setShowDropdown((s) => !s)}
              >
                My Profile ⬇
              </button>
              {showDropdown && (
                <div ref={menuRef} className="dropdown-menu">
                  <button onClick={() => handleDropdownClick('profile')}>View Profile</button>
                  <button onClick={() => handleDropdownClick('settings')}>Settings</button>
                  <button onClick={() => handleDropdownClick('logout')}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="add-book-form">
          <h2>Add New Book</h2>
          <form onSubmit={handleSubmit}>
            <input name="title" placeholder="Title" onChange={handleChange} required />
            <input name="author" placeholder="Author" onChange={handleChange} required />
            <input name="isbn" placeholder="ISBN" onChange={handleChange} required />
            <input name="category" placeholder="Category" onChange={handleChange} required />
            <input name="publishedDate" type="date" onChange={handleChange} required />
            <input name="quantity" type="number" min="1" onChange={handleChange} required />
            <input name="imageUrl" placeholder="Image URL" onChange={handleChange} />

            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Enter book description..."
            />

            <label>
              <input
                name="available"
                type="checkbox"
                checked={formData.available}
                onChange={handleChange}
              />
              Available
            </label>

            <button type="submit">Add Book</button>
          </form>
        </div>

        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Your Digital Library. All rights reserved.</p>
          <div className="footer-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/help">Help</a>
          </div>
        </footer>
      </div>
    </>
  );
}

export default AddBookForm;
