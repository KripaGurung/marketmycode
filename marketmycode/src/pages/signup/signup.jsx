import React, { useState } from "react";
import "./signup.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { registerUser } from "../../features/signup/signupSlice"; 
import { useNavigate } from "react-router-dom";

const Register = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("");
    const [interests, setInterests] = useState([]);
    const [skill, setSkill] = useState("beginner");
    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleInterestChange = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setInterests([...interests, value]);
        } else {
            setInterests(interests.filter((i) => i !== value));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("Invalid email format!");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        if (!termsAccepted) {
            toast.error("You must accept terms!");
            return;
        }

        const userData = {
            name,
            email,
            password,
            userName,
            phone,
            country,
            interests,
            skill
        };

        dispatch(registerUser(userData));
        toast.success("Registration successful!");

        navigate("/");

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setUserName("");
        setPhone("");
        setCountry("");
        setInterests([]);
        setSkill("beginner");
        setTermsAccepted(false);
    };

    return (
        <div className="main-container">
            <div className="form-container">

                <h2>Registration Form</h2>

                <div className="steps">
                    <div className="step start">1</div>
                    <div className="step">2</div>
                    <div className="step">3</div>
                    <div className="step">4</div>
                </div>

                <form id="register-form" onSubmit={handleSubmit}>

                    <div className="form-step active">

                        <h3>Account Information</h3>

                        <label>Full Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                        <label>Confirm Password</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

                        <div className="buttons">
                            <button type="button" className="next">Next</button>
                        </div>

                    </div>

                    <div className="form-step">

                        <h3>Personal Details</h3>

                        <label>Username</label>
                        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required />

                        <label>Phone</label>
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter Phone Number" />

                        <label>Country</label>
                        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />

                        <div className="buttons">
                            <button type="button" className="prev">Previous</button>
                            <button type="button" className="next">Next</button>
                        </div>

                    </div>

                    <div className="form-step">

                        <h3>Preferences</h3>

                        <label>Select your interests:</label>

                        <div className="interests-options">
                            {["Web App", "Mobile App", "UI/UX", "AI/ML", "Data Science"].map(
                                (interest) => (
                                    <div className="interest-option" key={interest}>
                                        <input
                                            type="checkbox"
                                            id={interest}
                                            value={interest}
                                            checked={interests.includes(interest)}
                                            onChange={handleInterestChange}
                                        />
                                        <label htmlFor={interest}>{interest}</label>
                                    </div>
                                )
                            )}
                        </div>

                        <label>Skill Level:</label>

                        <select value={skill} onChange={(e) => setSkill(e.target.value)}>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>

                        <div className="buttons">
                            <button type="button" className="prev">Previous</button>
                            <button type="button" className="next">Next</button>
                        </div>

                    </div>

                    <div className="form-step">

                        <h3>Confirm & Submit</h3>

                        <div className="terms-box">
                            <p className="terms-text">
                                By creating an account, you agree to our community guidelines.
                            </p>

                            <div className="terms-container">
                                <input
                                    type="checkbox"
                                    checked={termsAccepted}
                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                />
                                <label>I agree to the terms and conditions</label>
                            </div>

                        </div>

                        <div className="buttons">
                            <button type="button" className="prev">Previous</button>
                            <button type="submit">Create Account</button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;