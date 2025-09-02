// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Home from './pages/Home';
import AdminLogin from './pages/admin/AdminLogin';
import UserLogin from './pages/user/UserLogin';
import Register from './pages/Register';
import About from './pages/About';
import AddBookForm from './pages/admin/AddBookForm';
import BookDetails from './pages/user/BookDetails';
import BorrowedBooks from './pages/user/BorrowedBooks';

import './App.css';
import UserDashboard from './pages/user/UserDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserProfile from './pages/user/UserProfile';
import AdminProfile from './pages/admin/AdminProfile';
import UserSettings from './pages/user/UserSettings';

function App() {
  return (
    <Router>
      {/* <Header />   */}
      
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin/books/add" element={<AddBookForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/user-dashboard" element={<UserDashboard />}/>
           <Route path="/user/profile" element={<UserProfile />} />     
<Route path="/book/:id" element={<BookDetails />} />
<Route path="/user/borrowed-books" element={<BorrowedBooks />} />

           <Route path="/user/settings" element={<UserSettings />} />
          

           <Route path="/admin-dashboard" element={<AdminDashboard />}/>
           <Route path="/admin/profile" element={<AdminProfile />} /> 

          
        </Routes>
      </div>
    </Router>
  );

}


export default App;
