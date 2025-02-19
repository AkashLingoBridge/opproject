const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// 🔑 Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// 📝 Register User (Signup)
const registerUser = async (req, res) => {
    try {
        // ✅ Validate Input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;
        const normalizedEmail = email.toLowerCase();

        console.log("🔍 Checking if user exists:", normalizedEmail);

        // ❌ Check if user already exists
        let user = await User.findOne({ email: normalizedEmail });
        if (user) {
            console.log("❌ User already exists");
            return res.status(400).json({ message: "User already exists" });
        }

        // ✅ Create new user
        user = new User({ name, email: normalizedEmail, password });

        // 🔥 Save user (pre-save hook will hash password)
        await user.save();
        console.log("✅ User registered successfully:", user.email);

        // 🔐 Generate JWT Token
        res.status(201).json({
            message: "User registered successfully",
            token: generateToken(user._id)
        });

    } catch (error) {
        console.error("🔥 Registration Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// 🔐 Login User (Sign In)
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const normalizedEmail = email.toLowerCase();

        console.log("🔍 Checking email:", normalizedEmail);

        // 🔍 Find user
        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            console.log("❌ User not found");
            return res.status(401).json({ message: "Invalid email or password" });
        }

        console.log("✅ User found:", user.email);
        console.log("🔑 Checking password...");

        // ✅ Compare password securely
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            console.log("❌ Password mismatch");
            return res.status(401).json({ message: "Invalid email or password" });
        }

        console.log("✅ Password matched!");

        // 🔐 Generate JWT Token
        res.status(200).json({
            message: "Login successful",
            token: generateToken(user._id)
        });

    } catch (error) {
        console.error("🔥 Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { registerUser, loginUser };
