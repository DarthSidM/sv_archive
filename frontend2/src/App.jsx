import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterStudent from './pages/RegisterStudent';
import RegisterTeacher from './pages/RegisterTeacher';
import Home from './pages/Home';
import About from './pages/About';
import HomeTeacher from "./pages/HomeTeacher"
import LoginTeacher from "./pages/LoginTeacher"
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register/student" element={<RegisterStudent />} />
                <Route path="/register/teacher" element={<RegisterTeacher />} />
                <Route path="/login/teacher" element={<LoginTeacher />} />
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />}/>
                <Route path="/teacher" element={<ProtectedRoute>
                    <HomeTeacher/>
                </ProtectedRoute>}/>

            </Routes>
        </Router>
    );
};

export default App;




