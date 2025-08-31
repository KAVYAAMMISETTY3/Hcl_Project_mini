import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/AdminDashboard.css';

function AdminDashboard() {
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
      }   else {
      navigate('/admin-login', { replace: true });
    }
  }, [navigate]);


  // Close dropdown on outside click / Esc
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

  const handleLogout = () => {
    localStorage.removeItem('admin');
    alert('Logged out successfully!');
    navigate('/admin-login', { replace: true });
  };

  const handleDropdownClick = (action) => {
    setShowDropdown(false);
    if (action === 'profile') navigate('/admin/profile');
    else if (action === 'settings') navigate('/admin/settings');
    else if (action === 'logout') handleLogout();
  };

  const go = (path) => () => navigate(path);

  return (
    <>
      <div className="admin-dashboard">
        <header className="dashboard-header">
          <div className="header-content">
            {/* Left: Brand */}
            <div className="brand">
              <h2>Library Management</h2>
            </div>

            {/* Center: Welcome */}
            <div className="welcome">
              <h2>Welcome, {adminName}!</h2>
        
            </div>

            {/* Right: Profile */}
            <div className="profile-menu">
              <button
                ref={btnRef}
                className="profile-trigger"
                onClick={() => setShowDropdown((s) => !s)}
                aria-haspopup="menu"
                aria-expanded={showDropdown}
                aria-controls="admin-profile-menu"
              >
                My Profile ⬇
              </button>

              {showDropdown && (
                <div
                  id="admin-profile-menu"
                  role="menu"
                  ref={menuRef}
                  className="dropdown-menu"
                >
                  <button role="menuitem" onClick={() => handleDropdownClick('profile')}>
                    View Profile
                  </button>
                  <button role="menuitem" onClick={() => handleDropdownClick('settings')}>
                    Settings
                  </button>
                  <button role="menuitem" onClick={() => handleDropdownClick('logout')}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Action Cards */}
        <section className="dashboard-actions">
          <div className="dashboard-card">
            <h3>➕ Add Book</h3>
            <p>Create a new book entry in the catalog.</p>
            <button onClick={go('/admin/books/add')}>Add Book</button>
          </div>

          <div className="dashboard-card">
            <h3>✏️ Edit / View / Delete Books</h3>
            <p>Search, edit, or remove books from the catalog.</p>
            <button onClick={go('/admin/books')}>Open Books</button>
          </div>

          <div className="dashboard-card">
            <h3>🧑‍💼 Manage Users</h3>
            <p>View user activity and manage user accounts.</p>
            <button onClick={go('/admin/users')}>Go to User Management</button>
          </div>

          <div className="dashboard-card">
            <h3>🕘 Borrow History</h3>
            <p>See who borrowed which book and when.</p>
            <button onClick={go('/admin/borrow-history')}>View History</button>
          </div>

          <div className="dashboard-card">
            <h3>📊 Reports</h3>
            <p>Generate borrowing statistics and system reports.</p>
            <button onClick={go('/admin/reports')}>View Reports</button>
          </div>

          <div className="dashboard-card">
            <h3>⚙️ Settings</h3>
            <p>Configure system preferences and policies.</p>
            <button onClick={go('/admin/settings')}>Open Settings</button>
          </div>
        </section>
      </div>

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
}

export default AdminDashboard;

