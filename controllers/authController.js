const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .send("Username already exists. Please choose a different username.");
    }

    // Hash the password before saving it
    //const hashedPassword = await bcrypt.hash(password, 10);
    //console.log("Hashed Password:", hashedPassword);

    const user = new User({
      name,
      username,
      password,
      role: "member",
    });
    await user.save();
    res
      .header("Content-Type", "application/json")
      .status(201)
      .send("User registered successfully!");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log(username);

    // Find the user by username
    const user = await User.findOne({ username });
    // Manually verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Is Password Valid:", isPasswordValid);

    // Check if the user exists and the password is correct
    if (user && isPasswordValid) {
      // Generate a JWT token
      const token = jwt.sign(
        { username: user.username, role: user.role, name: user.name },
        "123",
        { expiresIn: "1h" }
      );

      res.status(200).json({ token });
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).send("No token provided.");
  }

  // Check if the token starts with "Bearer "
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  jwt.verify(token, "123", (err, decoded) => {
    if (err) {
      console.error("JWT Verification Error:", err);
      return res.status(500).send("Failed to authenticate token.");
    }

    req.user = decoded;
    next();
  });
};

// Check if user has admin role
const checkAdmin = (req, res, next) => {
  console.log("User Role:", req.user.role);
  if (req.user.role !== "admin") {
    return res.status(403).send("Permission denied. Admin access required.");
  }
  next();
};

module.exports = { register, login, authenticateToken, checkAdmin };
