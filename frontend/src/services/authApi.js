import axios from "axios";

const BASE_URL = "http://localhost:8000";

const loginUser = (email, password) => {
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);

  return axios.post(`${BASE_URL}/auth/login`, formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

const signupUser = (data) => {
  return axios.post(`${BASE_URL}/auth/signup`, data);
};

const forgotPassword = (email) => {
  return axios.post(`${BASE_URL}/auth/forget-password`, {
    email: email,
  });
};


export default {signupUser, loginUser, forgotPassword};