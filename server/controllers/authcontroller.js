const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

//@ desc Login
// @route POST /auth
// @access Public

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const foundUser = await User.findOne({ email }).exec();
  if (!foundUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const match = await bcrypt.compare(password, foundUser.password);
  

  
  if (!match) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const accessToken = jwt.sign(
    {
      UserInfo: {
        email: foundUser.email,
        isAdmin: foundUser.isAdmin,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10s" }
  );
  const refreshToken = jwt.sign(
    { email: foundUser.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.json({ accessToken });
});

// @desc Refesh
// @route GET /auth/refresh
// @access Public - because access token has expired

const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cokkies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await User.findOne({ email: decoded.email });
      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const accessToken = jwt.sign(
        {
          Userinfo: {
            email: foundUser.email,
            isAdmin: foundUser.isAdmin,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10s" }
      );
      res.json({ accessToken });
    })
  );
};

const logout = (req, res) => {
  const cookies = res.cookies;
  if (!cookies?.jwt) return res.sendStatus(201); 
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "cookie cleared" });
};

//@ desc register
// @route POST /auth
// @access Public

const register = asyncHandler(async (req, res) => {
  const { email, password, name, phonenumber } = req.body;

  if (!email || !password || !name || !phonenumber) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(403).json({ message: "already exists" });
  }
  const newPassword = await bcrypt.hash(password,10)
  const newUser = {
    name,
    email,
    password:newPassword,
    phonenumber,
  };

  await User.create(newUser);

  res.json({ message: "Registration successful" });
});



module.exports = { login, refresh, logout,register };
