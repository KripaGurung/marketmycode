import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from './pages/signup/signup.jsx';
import Login from './pages/login/login.jsx';
import Navbar from './component/Navbar/Navbar.jsx';
import Home from './pages/home/home.jsx';


function AppContent() {
  const location = useLocation();
  const navbarPaths = ['/', '/signup'];

  return (
    <>

    <ToastContainer position="top-center" autoClose={2000} />
    
    {!navbarPaths.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<div className="min-h-screen flex items-center justify-center text-xl text-gray-600">404 - Page Not Found</div>} />
      </Routes>
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
