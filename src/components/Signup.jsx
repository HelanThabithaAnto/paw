import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'; // Assuming your CSS is in a file named Signup.css

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');

    const [isOtpSent, setIsOtpSent] = useState(false);
    const [message, setMessage] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/signup', {
                username,
                email,
                password,
            });

            setMessage(response.data.message);
            setIsOtpSent(true); // OTP has been sent
        } catch (error) {
            setMessage(error.response.data.message || 'Error signing up');
        }
    };

    const handleOtpVerification = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/verify-otp', {
                email,
                otp,
            });

            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message || 'Error verifying OTP');
        }
    };

    return (
        <div className="signup-form-container">
            <h2>Sign Up</h2>
            {!isOtpSent ? (
                <form onSubmit={handleSignup}>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Sign Up</button>
                </form>
            ) : (
                <form onSubmit={handleOtpVerification}>
                    <label>Enter OTP:</label>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <button type="submit">Verify OTP</button>
                </form>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default Signup;
