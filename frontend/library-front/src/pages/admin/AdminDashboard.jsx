import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/AdminDashboard.css';

function AdminDashboard() {
  const [adminName, setAdminName] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [books, setBooks] = useState([]);
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
    async function fetchBooks() {
      try {
        const res = await axios.get('http://localhost:8081/api/books');
        setBooks(res.data);
      } catch (err) {
        console.error('Error fetching books:', err);
      }
    }
    fetchBooks();
  }, []);

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

  const go = (path) => () => navigate(path);

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

        <div className="dashboard-actions">
         
            <button onClick={go('/admin/books/add')}>Add Book</button>
        
        </div>

        <section className="book-table-section">
          <h3>Book Catalog</h3>
          <table className="book-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>ISBN</th>
                <th>Category</th>
                <th>Published</th>
                <th>Quantity</th>
                <th>Available</th>
              </tr>
            </thead>
            <tbody>
              {books.length === 0 ? (
                <tr><td colSpan="7">No books available.</td></tr>
              ) : (
                books.map((book) => (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.isbn}</td>
                    <td>{book.category}</td>
                    <td>{book.publishedDate}</td>
                    <td>{book.quantity}</td>
                    <td>{book.available ? 'Yes' : 'No'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>

        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Your Digital Library. All rights reserved.</p>
          
          
        </footer>
      </div>
    </>
  );
}

export default AdminDashboard;
