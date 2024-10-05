import React, { useState } from 'react';
import axios from 'axios';

const RegisterStudent = () => {
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password2: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/register/student/', formData);
            alert(response.data.message);
        } catch (error) {
            alert('Error registering student');
            console.error(error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" onChange={handleChange} />
            <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} />
            <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <input type="password" name="password2" placeholder="Confirm Password" onChange={handleChange} />
            <button type="submit">Register as Student</button>
        </form>
    );
};

export default RegisterStudent;
