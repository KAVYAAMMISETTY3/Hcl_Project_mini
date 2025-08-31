import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUser, FaCog, FaSignOutAlt,FaTachometerAlt } from 'react-icons/fa';
import '../../styles/BorrowedBook.css';

function BorrowedBooks() {
  const [transactions, setTransactions] = useState([]);
  const [userName, setUserName] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const userId = storedUser?.id;
    setUserName(storedUser?.name || 'User');

    axios.get(`http://localhost:8081/transactions/user/${userId}`)
      .then(response => setTransactions(response.data))
      .catch(error => console.error('Error fetching borrowed books:', error));
  }, []);

  const handleReturn = (transactionId) => {
    axios.post('http://localhost:8081/transactions/return', {
      transactionId: transactionId
    })
    .then(() => {
      alert('Book returned successfully');
      window.location.reload();
    })
    .catch(error => {
      console.error('Error returning book:', error);
      alert('Failed to return book.');
    });
  };

  const handleDropdownClick = (action) => {
    setShowDropdown(false);
    if (action === 'profile') window.location.href = '/user/profile';
    else if (action === 'settings') window.location.href = '/user/settings';
    else if(action=='userdashboard') window.location.href='/user-dashboard';
    else if (action === 'logout') {
      localStorage.removeItem('loggedInUser');
      window.location.href = '/user-login';
    }
  };

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
                      <button onClick={() => handleDropdownClick('userdashboard')}>
                        <FaTachometerAlt /> User Dashboard
                    </button>

                      <button onClick={() => handleDropdownClick('logout')}>
                        <FaSignOutAlt /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </header>

      <div className="borrowed-books-container">
        <h2>My Borrowed Books</h2>
        {transactions.length === 0 ? (
          <p>No books borrowed yet.</p>
        ) : (
          <ul className="borrowed-books-list">
            {transactions.map(tx => (
              <li key={tx.transactionId} className="borrowed-book-item">
                <div className="book-info">
                  <strong>{tx.bookTitle}</strong>
                  <span>Borrowed on: {tx.borrowDate}</span>
                  <span>Due: {tx.dueDate}</span>
                  {tx.returnDate && <span>Returned on: {tx.returnDate}</span>}
                  {tx.fine > 0 && <span>Fine: ₹{tx.fine}</span>}
                </div>
                {!tx.returnDate && (
                  <button className="return-button" onClick={() => handleReturn(tx.transactionId)}>
                    Return Book
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
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

export default BorrowedBooks;
