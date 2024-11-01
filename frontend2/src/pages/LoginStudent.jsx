import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function LoginTeacher() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const method = "login";
  const route = "http://127.0.0.1:8000/login/";
  const name = "Login";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      navigate("/student");
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };



//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     try {
//       // Step 1: Log in and store tokens
//       const res = await api.post(route, { username, password });
//       localStorage.setItem(ACCESS_TOKEN, res.data.access);
//       localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
  
//       // Step 2: Fetch user groups to confirm the teacher role
//       const userRes = await api.get("http://127.0.0.1:8000/api/user/groups/"); // Ensure this endpoint returns group info
//       const groups = userRes.data.groups;
  
//       // Step 3: Redirect only if user is a teacher
//       if (groups.includes("teacher")) {
//         navigate("/teacher");
//       } else {
//         setError("Access denied. Only teachers can access this page.");
//       }
//     } catch (error) {
//       console.error(error);
//       setError("Login failed. Please try again.");
//     }
//   };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>
      {error && <p className="error-message">{error}</p>}
      <input
        className="form-input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        className="form-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button className="form-button" type="submit">
        {name}
      </button>
    </form>
  );
}

export default LoginTeacher;
