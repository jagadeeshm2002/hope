const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

//@ desc Login
// @route POST /auth
// @access Public

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Find the user by email
  const user = await User.findOne({ email }).exec();
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Compare password with the hashed password
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: "Wrong password" });
  }

  // Generate the access
  const accessToken = jwt.sign(
    { Userinfo: { email: user.email, userId: user._id } },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  // Generate the refresh token
  const refreshToken = jwt.sign(
    { email: user.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  // Set the refresh token as an HttpOnly cookie
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None", // Required for cross-site requests
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  // Respond with the access token and user info
  res.json({
    accessToken,
    user: user.email,
    userId: user._id,
    message: "Logged in successfully",
  });
});

// @desc Refesh
// @route GET /auth/refresh
// @access Public - because access token has expired

const refresh = asyncHandler(async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const refreshToken = cookies.jwt;

  // Verify the refresh token
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      }

      // Find the user using the decoded email from the refresh token
      const foundUser = await User.findOne({ email: decoded.email });
      if (!foundUser) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Create a new access token
      const accessToken = jwt.sign(
        {
          Userinfo: {
            email: foundUser.email,
            userId: foundUser._id, // You may want to include the userId too
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      // Send the new access token back
      res.status(200).json({ accessToken });
    }
  );
});

const logout = (req, res) => {
  try {
    // Check if the cookie exists

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(201);

    // Clear the cookie
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

    // Return a success message
    res.json({ message: "cookie cleared" });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message });
  }
};

module.exports = { login, refresh, logout };

//@ desc register
// @route POST /auth
// @access Public

const register = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ error: "User already exists" });
  }
  const newPassword = await bcrypt.hash(password, 10);
  const newUser = {
    name,
    email,
    password: newPassword,
  };

  await User.create(newUser);

  res.status(201).json({ message: "Registration successful" });
});

module.exports = { login, refresh, logout, register };
