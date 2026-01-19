import React, { useState } from "react";
import "./signup.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import signupUser from "../../services/authApi";
import { useDispatch, useSelector } from "react-redux";
import {
  updateField,
  addInterest,
  removeInterest,
  nextStep,
  prevStep,
  resetForm,
} from "./registerFormSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useSelector((state) => state.registerForm);

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

      if (!form.skill) {
        toast.error("Please choose your level.");
        return false;
      }
    }

    if (form.currentStep === 3) {
      if (!form.termsAccepted) {
        toast.error("Please agree to terms and conditions.");
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep()) dispatch(nextStep());
  };

  const handlePrev = () => dispatch(prevStep());

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    const payload = {
      username: form.userName,
      email: form.email,
      fullname: form.name,
      password: form.password,
      phone: form.phone,
      country: form.country,
      preference: form.interests,
      level:
        form.skill === "beginner"
          ? "Beginner"
          : form.skill === "intermediate"
          ? "Intermediate"
          : "Professional",
    };

    console.log("SIGNUP PAYLOAD:", payload);

    try {
      await signupUser.signupUser(payload);
      toast.success("Registration successful!");
      console.log("User registered successfully");
      dispatch(resetForm());
      navigate("/");
    } catch (error) {
      console.log("SIGNUP ERROR:", error.response?.data);
      toast.error(error.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="main-container">
      <div className="form-container">
        <h2>Registration Form</h2>

        <div className="steps">
          {[0, 1, 2, 3].map((i) => ( <div key={i} className={`step ${form.currentStep >= i ? "active" : ""}`}> {i + 1} </div> ))}
        </div>

        <form id="register-form" onSubmit={handleSubmit}>
          {form.currentStep === 0 && (
            <div className="formStep active">
              <h3>Account Information</h3>

              <label>Full Name</label>
              <input type="text" value={form.name} placeholder="Enter Your Full Name" onChange={(e) => dispatch( updateField({ field: "name", value: e.target.value }))} />

              <label>Email</label>
              <input type="email" value={form.email} placeholder="Enter Your Email" onChange={(e) => dispatch( updateField({ field: "email", value: e.target.value }))} />

              <label>Password</label>
              <div className="password-wrapper">
                <input type={showPassword ? "text" : "password"} value={form.password} placeholder="Enter Your Password" onChange={(e) => dispatch( updateField({ field: "password", value: e.target.value }))} />
                <span className="eye-btn" onClick={() => setShowPassword(!showPassword)} > {showPassword ? <FaEyeSlash /> : <FaEye />} </span>
              </div>

              <label>Confirm Password</label>
              <div className="password-wrapper">
                <input type={showConfirmPassword ? "text" : "password"} value={form.confirmPassword} placeholder="Confirm Your Password" onChange={(e) => dispatch( updateField({ field: "confirmPassword", value: e.target.value }))} />
                <span className="eye-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)} > {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} </span>
              </div>

              <button type="button-next" onClick={handleNext}> Next </button>
            </div>
          )}

          {form.currentStep === 1 && (
            <div className="formStep active">
              <h3>Personal Details</h3>

              <label>Username</label>
              <input type="text" value={form.userName} onChange={(e) => dispatch( updateField({ field: "userName", value: e.target.value }))}/>

              <label>Phone</label>
              <input type="tel" value={form.phone} onChange={(e) => dispatch( updateField({ field: "phone", value: e.target.value }))} />

              <label>Country</label>
              <input type="text" value={form.country} onChange={(e) => dispatch( updateField({ field: "country", value: e.target.value }))} />

              <button type="button-next" onClick={handlePrev}> Previous </button>
              <button type="button-next" onClick={handleNext}> Next </button>

            </div>
          )}

          {form.currentStep === 2 && (
            <div className="formStep active">
              <h3>Preferences</h3>

              {["Web App", "Mobile App", "UI/UX", "AI/ML", "Data Science"].map(
                (interest) => (
                  <label key={interest}>
                    <input type="checkbox" value={interest} checked={form.interests.includes(interest)} onChange={handleInterestChange} />
                    {interest}
                  </label>
                )
              )}

              <select value={form.skill} onChange={(e) => dispatch( updateField({ field: "skill", value: e.target.value }))}>
                
                <option value="" disabled> Choose your level </option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Professional</option>

              </select>

              <button type="button-next" onClick={handlePrev}> Previous </button>
              <button type="button-next" onClick={handleNext}> Next </button>
            </div>
          )}

          {form.currentStep === 3 && (
            <div className="formStep active">
              <label>
                <input type="checkbox" checked={form.termsAccepted} onChange={(e) => dispatch( updateField({ field: "termsAccepted", value: e.target.checked }))} /> 
                I agree to the terms 
              </label>

              <button type="button-next" onClick={handlePrev}> Previous </button>
              <button type="submit">Create Account</button>
            </div>
          )}

          <p className="login-redirect">
            Already have an account?{" "}
            <span onClick={() => navigate("/")} className="login-link"> Login </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;