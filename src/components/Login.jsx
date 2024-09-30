// src/components/Login.js
import React from 'react';
import './Login.css'; // Create a separate CSS file for styles

const Login = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // You can add your form submission logic here
    
    };

    return (
        <div className="login-container">
            <div className="logo-container">
                <div className="logo">PAW & ME</div>
            </div>
            <div className="form-container">
                <h2>LOGIN</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username :</label>
                    <input type="text" id="username" name="username" required />
                    <label htmlFor="password">Password :</label>
                    <input type="password" id="password" name="password" required />
                    <button type="submit">Submit</button>
                </form>
                <a href="#">Forgot password</a>
            </div>
        </div>
    );
};

export default Login;
