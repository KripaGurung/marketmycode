import React, { useState } from "react";
import "./signup.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateField, addInterest, removeInterest, nextStep, prevStep, resetForm } from "./registerFormSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useSelector(state => state.registerForm);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const handleInterestChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) dispatch(addInterest(value));
    else dispatch(removeInterest(value));
 };

  const validateStep = () => {
    if (form.currentStep === 0) {

      if (!form.name || !form.email || !form.password || !form.confirmPassword) {
            toast.error("Please fill out all fields.");
            return false;
        }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            toast.error("Invalid email format!");
            return false;
        }

      if (form.password.length < 6) {
            toast.error("Password must be at least 6 characters!");
            return false;
        }

      if (form.password !== form.confirmPassword) {
            toast.error("Passwords do not match!");
            return false;
        }

    }

    if (form.currentStep === 1) {

      if (!form.userName || !form.country) {
            toast.error("Please fill out all personal details.");
            return false;
        }

      if (!/^[0-9]{10}$/.test(form.phone)) {
            toast.error("Enter valid 10-digit phone number.");
            return false;
        }

    }

    if (form.currentStep === 2) {

      if (form.interests.length < 3) {
            toast.error("Select at least 3 interests.");
            return false;
        }

    }

    if (form.currentStep === 3) {

      if (!form.termsAccepted) {
            toast.error("Please agree to terms and conditions before creating account.");
            return false;
        }

    }

    return true;
  };

  const handleNext = () => {
    if (validateStep()) dispatch(nextStep());
  };

  const handlePrev = () => dispatch(prevStep());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    const userData = {
      name: form.name,
      email: form.email,
      password: form.password,
      userName: form.userName,
      phone: form.phone,
      country: form.country,
      interests: form.interests,
      skill: form.skill,
    };

    console.log("Form data submitted:", userData);
    toast.success("Registration successful!");

    dispatch(resetForm());
    navigate("/");
  };

  return (
        <div className="main-container">
            <div className="form-container">
                <h2>Registration Form</h2>
                
                <div className="steps">
                    {[0,1,2,3].map(i => (
                        <div key={i} className={`step ${form.currentStep >= i ? "active" : ""}`}>{i+1}</div>
                    ))}
                </div>
                
                <form id="register-form" onSubmit={handleSubmit}>
                    
                    {form.currentStep === 0 && (
                        <div className="form-step active">
                            <h3>Account Information</h3>
                            
                            <label>Full Name</label>
                            <input type="text" value={form.name} onChange={(e) => dispatch(updateField({field: "name", value: e.target.value}))} />
              
                            <label>Email</label>
                            <input type="email" value={form.email} onChange={(e) => dispatch(updateField({field: "email", value: e.target.value}))} />
              
                            <label>Password</label>

                            <div className="password-wrapper">
                                
                                <input type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => dispatch(updateField({ field: "password", value: e.target.value }))} />
                                <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)} > {showPassword ? <FaEyeSlash /> : <FaEye />}</button>
                            </div>
                            
                            <label>Confirm Password</label>
                            
                            <div className="password-wrapper">
                                <input type={showConfirmPassword ? "text" : "password"} value={form.confirmPassword} onChange={(e) => dispatch(updateField({ field: "confirmPassword", value: e.target.value }))} />
                                <button type="button" className="eye-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)} > {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</button>
                            </div>

                              <div className="buttons">
                                <button type="button" className="next" onClick={handleNext}>Next</button>
                            </div>

                        </div>
                    )}
                    
                    {form.currentStep === 1 && (
                        <div className="form-step active">
                            
                            <h3>Personal Details</h3>
                            
                            <label>Username</label>
                            <input type="text" value={form.userName} onChange={(e) => dispatch(updateField({field: "userName", value: e.target.value}))} />

                            <label>Phone</label>
                            <input type="tel" value={form.phone} onChange={(e) => dispatch(updateField({field: "phone", value: e.target.value}))} placeholder="Enter Phone Number" />

                            <label>Country</label>
                            <input type="text" value={form.country} onChange={(e) => dispatch(updateField({field: "country", value: e.target.value}))} />

                            <div className="buttons">
                                <button type="button" className="prev" onClick={handlePrev}>Previous</button>
                                <button type="button" className="next" onClick={handleNext}>Next</button>
                            </div>
                        </div>
                    )}
                    
                    {form.currentStep === 2 && (
                        <div className="form-step active">
                            
                            <h3>Preferences</h3>
                            
                            <label>Select your interests (min 3):</label>
                            
                            <div className="interests-options">
                                {["Web App", "Mobile App", "UI/UX", "AI/ML", "Data Science"].map(
                                    (interest) => (
                                    
                                    <div key={interest} className="interest-option">
                                        <input type="checkbox" id={interest} value={interest} checked={form.interests.includes(interest)} onChange={handleInterestChange}/>
                                        <label htmlFor={interest}>{interest}</label>
                                    </div>
                                ))}
                            </div>
                            
                            <label>Skill Level:</label>
                            
                            <select value={form.skill} onChange={(e) => dispatch(updateField({field: "skill", value: e.target.value}))}>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                            
                            <div className="buttons">
                                <button type="button" className="prev" onClick={handlePrev}>Previous</button>
                                <button type="button" className="next" onClick={handleNext}>Next</button>
                            </div>
                        </div>
                    )}
                    
                    {form.currentStep === 3 && (  
                        <div className="form-step active">
                            
                            <h3>Confirm & Submit</h3>
                            
                            <div className="terms-box">
                                <p className="terms-text">By creating an account, you agree to our community guidelines.</p>
                                
                                <div className="terms-container">
                                    <input type="checkbox" checked={form.termsAccepted} onChange={(e) => dispatch(updateField({field: "termsAccepted", value: e.target.checked}))} />
                                    <label>I agree to the terms and conditions</label>
                                </div>
                            </div>
                            
                            <div className="buttons">
                                <button type="button" className="prev" onClick={handlePrev}>Previous</button>
                                <button type="submit">Create Account</button>
                            </div>
                        </div>
                    )}

                      <p className="login-redirect">Already have an account?{" "} <span onClick={() => navigate("/")} className="login-link">Login</span></p>
                      
                </form>
            </div>
        </div>
    );
};

export default Register;