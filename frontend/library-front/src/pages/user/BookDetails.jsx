import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/BookDetails.css';

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
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
    axios.get(`http://localhost:8081/api/books/${id}`)
      .then((res) => setBook(res.data))
      .catch((error) => console.error('Error fetching book details:', error));
  }, [id]);

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

  const handleBorrow = () => {
  const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const userId = storedUser?.id;

  axios.post('http://localhost:8081/transactions/borrow', {
    userId: userId,
    bookId: book.id
  })
  .then(() => {
    alert(`You have borrowed "${book.title}"`);

    // Optional: store a flag or trigger for dashboard to refresh
    localStorage.setItem('borrowedBookUpdated', 'true');
  })
  .catch((error) => {
    console.error('Error borrowing book:', error);
    alert('Failed to borrow book.');
  });
};


    

  if (!book) return <p>Loading book details...</p>;

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
                <button onClick={() => handleDropdownClick('profile')}>Profile</button>
                <button onClick={() => handleDropdownClick('settings')}>Settings</button>
                <button onClick={() => handleDropdownClick('borrowed')}>Borrowed Books</button>
                <button onClick={() => handleDropdownClick('logout')}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="book-details-container">
        <div className="book-details-card">
          <img
            src={book.imageUrl || `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}
            alt={book.title}
            className="book-details-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/default-book-cover.jpg';
            }}
          />
          <div className="book-details-info">
            <h2>{book.title}</h2>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Category:</strong> {book.category}</p>
            <p><strong>Status:</strong> {book.available ? 'Available' : 'Unavailable'}</p>
            <p><strong>Description:</strong> {book.description || 'No description available.'}</p>
            <button onClick={handleBorrow} disabled={!book.available}>
              {book.available ? 'Borrow Book' : 'Not Available'}
            </button>
          </div>
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

export default BookDetails;
