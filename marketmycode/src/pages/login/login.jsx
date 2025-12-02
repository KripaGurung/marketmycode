import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "./loginSlice";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(setLogin({ email, password }));
    navigate("/home");
  };

  return (
        <div className="main-container">
            <h1>Welcome To Back!</h1>

            <form id="login-form" onSubmit={handleSubmit}>
                <div className="form-container">

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Enter Your Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter Your Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <div className="remember-forgot">
                    <label>
                        <input type="checkbox" /> Remember me
                    </label>
                    <a href="#">Forgot password?</a>
                </div>
                
                <div className="buttons">
                    <button type="submit">Login</button>
                </div>
                
                <p>Don't have an account?{" "}<span onClick={() => navigate("/signup")} className="login-link">Register</span></p>

            </form>
        </div>
    );
};

export default Login;