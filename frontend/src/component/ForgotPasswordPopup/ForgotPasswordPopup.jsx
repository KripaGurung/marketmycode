import React, { useState } from "react";
import "./ForgotPasswordPopup.css";
import { assets } from "../../assets/assets.js";
import authApi from "../../services/authApi";
import { toast } from "react-toastify";

const ForgotPasswordPopup = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      await authApi.forgotPassword(email);
      toast.success("Password reset email sent!");
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Failed to send reset email"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2 className="title">Forgot Password?</h2>
        <p className="subtitle">Lost your password? We'll email you a reset link.</p>

        <img src={assets.forgot} alt="mail" className="popup-img" />

        <input type="email" className="email-input" placeholder="Type your Email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <div className="btn-group">
          <button className="send-btn" onClick={handleSend} disabled={loading}> {loading ? "Sending..." : "Send"} </button>
          <button className="cancel-btn" onClick={onClose}> Cancel </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPopup;