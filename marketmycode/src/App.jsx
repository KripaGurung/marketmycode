import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from './pages/signup/signup.jsx';
import Login from './pages/login/login.jsx'

function App() {
  
  return (
    <>

     <ToastContainer position="top-center" autoClose={2000} />
     
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
    </>
  )
}

export default App;