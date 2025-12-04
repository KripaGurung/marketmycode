import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="nav-container">
      <nav className="nav-bar">
        <img onClick={() => navigate("/home")} src="/logo.png" alt="Logo" className="Logo"/>

        <ul className="nav-links">
          <li onClick={() => navigate("/home")}>Home</li>
          <li>Products</li>
          <li>Cart</li>
        </ul>

        <div className="nav-section">
          <button onClick={() => navigate("/login")} className="Button">Login</button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
