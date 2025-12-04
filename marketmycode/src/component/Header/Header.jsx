import React from 'react';
// import { assets } from "../../assets/assets.js";
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();

    return (
        <div className="header-wrapper">
            <div className="header-container">

                <div className="image-container">
                    <img src="" alt="image" className="hero-image"/>
                </div>

                <div className="text-container">
                    <p className="text-one">Innovation at Your Fingertips</p>
                    <p className="text-two">We designed this platform to connect people with the right resources, whether you're learning, building, or selling. Our goal is to support your journey by providing easy access to digital products that save time and boost productivity. Start exploring and experience a smarter way to create.</p>
                    <div className="button-group">
                        <button onClick={() => navigate("/projects")} className="primary-button">Explore Projects</button>
                        <button onClick={() => navigate("/create")} className="secondary-button">Start Creating</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;