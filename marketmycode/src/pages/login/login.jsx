import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../login/loginSlice"
import ForgotPasswordPopup from "../../component/ForgotPasswordPopup/ForgotPasswordPopup";
import loginUser  from "../../services/authApi";
import { toast } from "react-toastify";
import "./login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const res = await loginUser(email, password);

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

            navigate("/home");
        } catch {
            toast.error("Invalid username or password");
        }
    };
    
    return (
        <div className="main-container">
            <h1>Welcome Back!</h1>

            <form id="login-form" onSubmit={handleSubmit}>
                <div className="form-container">
                    <label>Email</label>
                    <input type="email" placeholder="Enter Your Email" required value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label>Password</label>
                    <input type="password" placeholder="Enter Your Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                
                <div className="remember-forgot">
                    <label> <input type="checkbox" /> Remember me </label>

                    <span className="forgot-link" onClick={() => setShowPopup(true)}>Forgot password? </span>
                </div>
                
                <div className="buttons">
                    <button type="submit">Login</button>
                </div>
                
                <p> Don't have an account?{" "}
                    <span onClick={() => navigate("/signup")} className="login-link"> Register </span>
                </p>
            </form>
            
            {showPopup && (
                <ForgotPasswordPopup onClose={() => setShowPopup(false)} />
            )}
        </div>
    );
};

export default Login;