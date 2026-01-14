import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../pages/login/loginSlice";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.login);
  const name = localStorage.getItem("name");

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("name");
    navigate("/");
  };

  return (
    <div className="nav-container">
      <nav className="nav-bar">
        <img onClick={() => navigate("/home")} src="/logo.png" alt="Logo" className="Logo" />

        <ul className="nav-links">
          <li onClick={() => navigate("/home")}>Home</li>
          <li onClick={() => navigate("/project")}>Projects</li>
          <li>Cart</li>
        </ul>

        <div className="nav-section">
          {!isLoggedIn ? (
            <div className="nav-auth" onClick={() => navigate("/")}>
              <FaUserCircle size={22} />
              <span>Login</span>
            </div>
          ) : (
            <div className="nav-auth">
              <FaUserCircle size={26} />
              <span>{name || "User"}</span>
              <FaSignOutAlt onClick={handleLogout} />
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
