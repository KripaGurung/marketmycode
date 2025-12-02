import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './pages/signup/signup.jsx';

function App() {
  
  return (
    <>
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
    </>
  )
}

export default App;