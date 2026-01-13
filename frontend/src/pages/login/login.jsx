import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../login/loginSlice";
import ForgotPasswordPopup from "../../component/ForgotPasswordPopup/ForgotPasswordPopup";
import authApi from "../../services/authApi";
import { toast } from "react-toastify";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState(""); // value = username
  const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter username and password");
      return;
    }

    try {
      // 🔹 email variable actually holds USERNAME
      const res = await authApi.loginUser(email, password);

      const { token, refresh_token, user_id } = res.data.data;

      dispatch(
        setLogin({
          userId: user_id,
          token: token,
        })
      );

      localStorage.setItem("token", token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("user_id", user_id);

      toast.success("Login successful!");
      navigate("/home");
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Invalid username or password"
      );
    }
  };

  return (
    <div className="main-container">
      <h1>Welcome Back!</h1>

      <form id="login-form" onSubmit={handleSubmit}>
        <div className="form-container">
          {/* 🔴 Email → Username */}
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter Your Username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Your Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="remember-forgot">
          <label>
            <input type="checkbox" /> Remember me
          </label>

          <span className="forgot-link" onClick={() => setShowPopup(true)}>
            Forgot password?
          </span>
        </div>

        <div className="buttons">
          <button type="submit">Login</button>
        </div>

        <p>
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")} className="login-link">
            Register
          </span>
        </p>
      </form>

      {showPopup && (
        <ForgotPasswordPopup onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default Login;