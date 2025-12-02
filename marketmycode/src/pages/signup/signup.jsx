import React from "react";
import "./signup.css";
import {useState} from "react";

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return(
        <div className="main-container">
            <div className="form-container">

                <h2>Registration Form</h2>
                
                <div className="steps">
                    <div className="step start">1</div>
                    <div className="step">2</div>
                    <div className="step">3</div>
                    <div className="step">4</div>
                </div>
                
                <form id="register-form">

                    <div className="form-step active">

                        <h3>Account Information</h3>
                        
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                        
                        <label htmlFor="email">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        
                        <label htmlFor="password">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        
                        <div className="buttons">
                            <button type="button" className="next">Next</button>
                        </div>

                    </div>
                    
                    <div className="form-step">

                        <h3>Personal Details</h3>
                        
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" placeholder="Enter Username" required />
                        
                        <label htmlFor="phone">Phone</label>
                        <input type="tel" id="phone" name="phone" placeholder="Enter Phone Number" pattern="[0-9]{10}" />
                        
                        <label htmlFor="country">Country</label>
                        <input type="text" id="country" name="country" placeholder="Enter Country" required />
                        
                        <div className="buttons">
                            <button type="button" className="prev">Previous</button>
                            <button type="button" className="next">Next</button>
                        </div>

                    </div>
                    
                    <div className="form-step">

                        <h3>Preferences</h3>
                        <label>Select your interests:</label>
                        
                        <div className="interests-options">

                            <div className="interest-option">
                                <input type="checkbox" id="web-app" name="interests" value="Web App" />
                                <label htmlFor="web-app">Web App</label>
                            </div>
                            
                            <div className="interest-option">
                                <input type="checkbox" id="mobile-app" name="interests" value="Mobile App" />
                                <label htmlFor="mobile-app">Mobile App</label>
                            </div>

                            <div className="interest-option">
                                <input type="checkbox" id="ui-ux" name="interests" value="UI/UX" />
                                <label htmlFor="ui-ux">UI/UX</label>
                            </div>

                            <div className="interest-option">
                                <input type="checkbox" id="ai-ml" name="interests" value="AI/ML" />
                                <label htmlFor="ai-ml">AI/ML</label>
                            </div>

                            <div className="interest-option">
                                <input type="checkbox" id="data-science" name="interests" value="Data Science" />
                                <label htmlFor="data-science">Data Science</label>
                            </div>

                        </div>

                        <label htmlFor="skill">Skill Level:</label>
                        <select id="skill">
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
                            <p className="terms-text">By creating an account, you agree to comply with our community guidelines and data privacy policy. Please read all terms carefully before proceeding.</p>
                            
                            <div className="terms-container">
                                <input type="checkbox" id="terms" />
                                <label htmlFor="terms">I agree to the <a href="#" className="terms-link">terms and conditions</a></label>
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
    )
}

export default Register;