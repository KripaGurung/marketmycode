import React, { useEffect } from "react";
import "./profile.css";
import { useDispatch, useSelector } from "react-redux";
import authApi from "../../services/authApi";
import { setUser } from "../login/loginSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.token);
  const user = useSelector((state) => state.login.user);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await authApi.getMe(token);
        dispatch(setUser(res.data));
        localStorage.setItem("user", JSON.stringify(res.data));
      } catch {
        console.error("Failed to fetch profile");
      }
    };

    if (token && !user?.email) {
      fetchProfile();
    }
  }, [token, dispatch, user]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">
            {user.fullname?.charAt(0)}
          </div>
        </div>

        <div className="profile-main">
          <h2>{user.fullname}</h2>
          <p className="role">{user.level} Developer</p>
        </div>

        <div className="profile-info">
          <div className="info-box">
            <h4>Contact Info</h4>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
          </div>

          <div className="info-box">
            <h4>Location</h4>
            <p>{user.country}</p>
          </div>

          <div className="info-box full">
            <h4>Preferences</h4>
            <div className="tags">
              {user.preference?.map((item, i) => (
                <span key={i} className="tag">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;