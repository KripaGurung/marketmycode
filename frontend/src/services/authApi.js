import axios from "axios";

const BASE_URL = "http://localhost:8000";

const loginUser = (username, password) => {
  return axios.post(`${BASE_URL}/auth/login`, {
    username: username,
    password: password,
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

const getMe = (token) => {
  return axios.get(`${BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default { signupUser, loginUser, forgotPassword, getMe };