import React from "react";
import "./ForgotPasswordPopup.css";
import { assets } from "../../assets/assets.js";

const ForgotPasswordPopup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2 className="title">Forgot Password?</h2>
        <p className="subtitle">Lost your password? We'll email you a reset link.</p>

        <img src={assets.forgot} alt="mail" className="popup-img"/>

        <input type="email" className="email-input" placeholder="Type your Email" />

        <div className="btn-group">
          <button className="send-btn">Send</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPopup;