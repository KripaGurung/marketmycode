import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from './pages/signup/signup.jsx';
import Login from './pages/login/login.jsx';
import Navbar from './component/Navbar/Navbar.jsx';
import Home from './pages/home/home.jsx';
import Footer from "./component/Footer/Footer.jsx"; 
import Project from './pages/projects/project.jsx';
import Create from './pages/upload/create.jsx';
import Profile from './pages/profile/profile.jsx';

function AppContent() {
  const location = useLocation();

  const navbarPaths = ['/', '/signup'];
  const footerPaths = ['/', '/signup'];
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />

      {!navbarPaths.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={ isLoggedIn ? <Navigate to="/home" replace /> : <Login /> } />
        <Route path="/signup" element={ isLoggedIn ? <Navigate to="/home" replace /> : <Signup /> } />
        <Route path="/home" element={ isLoggedIn ? <Home /> : <Navigate to="/" replace /> } />
        <Route path="/project" element={ isLoggedIn ? <Project /> : <Navigate to="/" replace /> } />
        <Route path="/upload" element={isLoggedIn ? <Create /> : <Navigate to="/" />} />
        <Route path="/profile" element={ isLoggedIn ? <Profile /> : <Navigate to="/" replace /> } />

        <Route path="*" element={ <div className="min-h-screen flex items-center justify-center text-xl text-gray-600"> 404 - Page Not Found </div> } />

      </Routes>

      {!footerPaths.includes(location.pathname) && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;