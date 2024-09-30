import React from 'react';
import './Home.css'; // Link to the CSS file for styling

function Home() {
  return (
    <div className="home-container">
      <nav className="navbar">
        <a href="#">Home</a>
        <a href="#">About Us</a>
        <a href="#">Services</a>
        <a href="#">Contact</a>
        <a href="#">Logout</a>
      </nav>

      <header className="welcome-header">
        <h1>Welcome to Paw & Me</h1>
        <p>Your trusted Pet Care Center</p>
      </header>

      <div className="home-content">
        <h2>Our Services</h2>
        <p>We offer the best services for your furry friends, including grooming, training, veterinary care, and more!</p>
        <button>Explore More</button>
      </div>
    </div>
  );
}

export default Home;
