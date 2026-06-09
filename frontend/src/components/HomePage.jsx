import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HomePage.css"; // Styling for the homepage

const HomePage = () => {
  const navigate = useNavigate();

  // Check if the user is logged in
  const isLoggedIn = !!localStorage.getItem("token");

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token
    localStorage.removeItem("userId"); // Remove the token
    alert("You have been logged out.");
    navigate("/"); // Redirect to the login page
  };

  return (
    <div className="homepage-container">
      <header className="header">
        <h1 className="logo">CodeCollaborator</h1>
        <nav className="nav-links">
          {!isLoggedIn && (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/signup" className="nav-link">
                Signup
              </Link>
            </>
          )}
          
          {isLoggedIn && (
            <>
              <Link to="/editorpage" className="nav-link">
                Editor Page
              </Link>
              <button onClick={handleLogout} className="nav-link">
                Logout
              </button>
            </>
          )}

        </nav>
      </header>
      <main className="main-content">
        <h2>Collaborate on Code in Real-Time</h2>
        <p>
          Build, edit, and run code with your team in a shared environment.
          Experience seamless collaboration and powerful tools for coding together.
        </p>
        {!isLoggedIn && (
          <Link to="/signup" className="get-started-btn">
            Get Started
          </Link>
        )}
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} CodeCollaborator. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
