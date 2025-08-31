import React from 'react';
import '../styles/HomePage.css';
import Navbar from '../components/Navbar';
function Home() {
  return (
    <>
    <Navbar />
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Your Digital Library</h1>
        <p>Manage your books, explore new titles, and enjoy seamless access to knowledge.</p>
        <button className="cta-button">Explore Library</button>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Search Books</h3>
            <p>Quickly find books by title, author, or genre.</p>
          </div>
          <div className="feature-card">
            <h3>Manage Account</h3>
            <p>Track borrowed books and due dates easily.</p>
          </div>
          <div className="feature-card">
            <h3>New Arrivals</h3>
            <p>Stay updated with the latest additions.</p>
          </div>
          <div className="feature-card">
            <h3>Recommendations</h3>
            <p>Get personalized book suggestions.</p>
          </div>
          <div className="feature-card">
            <h3>Recommendations</h3>
            <p>Get personalized book suggestions.</p>
          </div>
          <div className="feature-card">
            <h3>Recommendations</h3>
            <p>Get personalized book suggestions.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact">
        <h2>Contact Us</h2>
        <p>If you have any questions or feedback, feel free to reach out!</p>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="4" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>

      {/* Footer Section */}
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

export default Home;
