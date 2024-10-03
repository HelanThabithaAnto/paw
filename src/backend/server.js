const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Initialize Express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL connection setup
const db = mysql.createConnection({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12734464',       // Removed leading space in username
    password: 'x1wt3nJivH',    // Removed leading space in password
    database: 'sql12734464',
    port: 3306,
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Setup Nodemailer for email
const transporter = nodemailer.createTransport({
    service: 'Gmail',  
    auth: {
        user: 'helanthabithaanto@gmail.com',  // Your Gmail account
        pass: 'cemb yucg gpcz shof'          // App-specific password (important for Gmail security)
    }
});

// In-memory OTP store (could be enhanced using a database or cache like Redis)
let otpStore = {};

// Function to generate a 6-digit OTP
function generateOTP() {
    return crypto.randomInt(100000, 999999).toString();  // Generates a random 6-digit OTP
}

// User Registration Route with OTP
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    // Check if user already exists
    db.query('SELECT * FROM mytable WHERE email = ?', [email], async (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a 6-digit OTP
        const otp = generateOTP();

        // Store OTP temporarily in-memory (you could use Redis or a database)
        otpStore[email] = otp;

        // Send OTP to the user's email
        const mailOptions = {
            from: 'helanthabithaanto@gmail.com',
            to: email,
            subject: 'Your OTP for PAW & ME Signup',
            text: `Your OTP is: ${otp}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: 'Error sending OTP email' });
            }
            console.log('Email sent: ' + info.response);

            // Save new user with hashed password to the database (without OTP)
            db.query(
                'INSERT INTO mytable (username, email, password) VALUES (?, ?, ?)',
                [username, email, hashedPassword],
                (err) => {
                    if (err) throw err;
                    res.json({ message: 'User registered, OTP sent to email' });
                }
            );
        });
    });
});

// OTP Verification Route
app.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;

    // Check if the OTP matches the one stored in-memory
    if (otpStore[email] && otpStore[email] === otp) {
        // OTP is valid, remove the OTP from memory
        delete otpStore[email];
        res.json({ message: 'OTP verified successfully, user is registered' });
    } else {
        res.status(400).json({ message: 'Invalid OTP' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
