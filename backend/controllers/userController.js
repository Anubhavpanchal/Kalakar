import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Function to create a JWT token
const createToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" }); // Token expires in 7 days
};

// Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, cart: user.cart },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Route for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Please fill all the fields" });
    }

    // Check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
    }

    // Hash the user's password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword, // Use the hashed password
    });

    const user = await newUser.save();

    // Generate a token
    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Route for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    // Check if the email and password match the admin credentials
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      // Generate a token with the admin email as the payload
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });
      return res.json({ success: true, token });
    } else {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Error in adminLogin:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Route to save cart data
const saveCart = async (req, res) => {
  try {
    const { userId, cart } = req.body;

    // Validate input
    if (!userId || !cart) {
      return res.status(400).json({ success: false, message: "User ID and cart data are required" });
    }

    // Update the user's cart in the database
    const user = await userModel.findByIdAndUpdate(userId, { cart }, { new: true });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "Cart saved successfully", cart: user.cart });
  } catch (err) {
    console.error("Error in saveCart:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { loginUser, registerUser, adminLogin, saveCart };