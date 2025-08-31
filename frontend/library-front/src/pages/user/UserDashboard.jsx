import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaCog, FaBook, FaSignOutAlt,FaSearch,FaListAlt,FaFilter,FaSortAlphaDown } from 'react-icons/fa';
import '../../styles/UserDashboard.css';

function UserDashboard() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('');
  const [userName, setUserName] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.name || 'User');
    } else {
      navigate('/user-login');
    }
  }, [navigate]);

  useEffect(() => {
    axios.get('http://localhost:8081/api/books')
      .then((res) => setBooks(res.data))
      .catch((error) => console.error('Error fetching books:', error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/user-login');
  };

  const handleDropdownClick = (action) => {
    setShowDropdown(false);
    if (action === 'profile') navigate('/user/profile');
    else if (action === 'settings') navigate('/user/settings');
    else if (action === 'borrowed') navigate('/user/borrowed-books');
    else if (action === 'logout') handleLogout();
  };

  let filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (availabilityFilter !== 'All') {
    filteredBooks = filteredBooks.filter(book =>
      availabilityFilter === 'Available'
        ? book.available === true || book.available === 'true'
        : book.available === false || book.available === 'false'
    );
  }

  if (categoryFilter !== 'All') {
    filteredBooks = filteredBooks.filter(book => book.category === categoryFilter);
  }

  if (sortBy === 'Title') {
    filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === 'Author') {
    filteredBooks.sort((a, b) => a.author.localeCompare(b.author));
  }

  return (
    <>
      <header className="dashboard-header">
        <div className="header-content">
          <div className="brand"><h2>Library Management</h2></div>
          <div className="welcome"><h2>Welcome to the Library, {userName}!</h2></div>
          <div className="profile-menu">
            <button onClick={() => setShowDropdown(!showDropdown)}>My Profile ⬇</button>
            {showDropdown && (
              <div className="dropdown-menu">
                <button onClick={() => handleDropdownClick('profile')}>
                  <FaUser /> Profile
                </button>
                <button onClick={() => handleDropdownClick('settings')}>
                  <FaCog /> Settings
                </button>
                <button onClick={() => handleDropdownClick('borrowed')}>
                  <FaBook /> Borrowed Books
                </button>
                <button onClick={() => handleDropdownClick('logout')}>
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="dashboard-body">
        <div className="filters-panel">
  <div className="filter-label"><FaSearch /> Search</div>
  <div className="search-input-wrapper">
    <input
      type="text"
      placeholder="Search books..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>

  <div className="filter-label"><FaListAlt /> Category</div>
  <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
    <option>All</option>
    <option>Fiction</option>
    <option>Non-fiction</option>
    <option>Science</option>
    <option>History</option>
    <option>Biography</option>
  </select>

  <div className="filter-label"><FaFilter /> Availability</div>
  <select value={availabilityFilter} onChange={(e) => setAvailabilityFilter(e.target.value)}>
    <option>All</option>
    <option>Available</option>
    <option>Unavailable</option>
  </select>

  <div className="filter-label"><FaSortAlphaDown /> Sort</div>
  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
    <option value="">Sort</option>
    <option value="Title">Sort by Title</option>
    <option value="Author">Sort by Author</option>
  </select>
</div>


        <div className="book-list">
          {filteredBooks.map(book => (
            <div key={book.id} className="book-card">
              <img
                src={book.imageUrl || `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
                alt={book.title}
                className="book-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/default-book-cover.jpg';
                }}
              />
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Category:</strong> {book.category}</p>
              <p><strong>Status:</strong> {book.available === true || book.available === 'true' ? 'Available' : 'Unavailable'}</p>
              <button onClick={() => navigate(`/book/${book.id}`)}>View Details</button>
            </div>
          ))}
        </div>
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

export default UserDashboard;
