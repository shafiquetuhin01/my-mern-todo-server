const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = require('express').Router();
require('dotenv').config()

// get all items
router.get('/api/login', async (req, res) => {
  try {
    const getAllUsers = await User.find({});
        res.status(200).json(getAllUsers);
  } catch (error) {
    res.json(error);
  }
});
// Set up the Signup route
router.post('/api/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Send success response
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

  // signin route 
  router.post('/api/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validate input
      if (!email || !password) {
        return res.status(400).json({ message: 'Please provide both email and password' });
      }
  
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Send success response
      res.json({ message: 'Logged in successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  
  module.exports = router