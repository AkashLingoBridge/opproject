const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            if (!token) {
                return res.status(401).json({ message: "Not authorized, no token provided" });
            }

            if (!process.env.JWT_SECRET) {
                console.error("❌ Missing JWT_SECRET in environment variables");
                return res.status(500).json({ message: "Internal server error" });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                return res.status(401).json({ message: "User not found, not authorized" });
            }

            next();
        } catch (error) {
            console.error("❌ Token verification failed:", error.message);
            return res.status(401).json({ message: "Not authorized, invalid token" });
        }
    } else {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};
console.log("🔍 authMiddleware.js: protect =", protect);

module.exports = { protect };
