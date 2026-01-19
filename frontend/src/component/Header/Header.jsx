import React from "react";
import { assets } from "../../assets/assets.js";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-card">

  
        <div className="hero-left">
          <h1>Innovation at Your Fingertips</h1>

          <p>
            We designed this platform to connect people with the right resources,
            whether you're learning, building, or selling. Our goal is to support
            your journey by providing easy access to digital products that save
            time and boost productivity. Start exploring and experience a smarter
            way to create.
          </p>

          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate("/project")}> Explore Projects </button>
            <button className="btn-outline" onClick={() => navigate("/upload")}>  Start Creating </button>
          </div>
        </div>


        <div className="hero-right">
          <img src={assets.home} alt="hero" />
        </div>

      </div>
    </section>
  );
};

export default Header;