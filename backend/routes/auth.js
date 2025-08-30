const express = require("express");
const Reviewer = require("../models/User");
const router = express.Router();
const generateToken = require("../Utils/token");


router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !password || !email) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const userExists = await Reviewer.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "This user already exists" });
    }

    const reviewer = await Reviewer.create({ name, email, password });
    const token = generateToken(reviewer._id);

    res.status(201).json({
      userID: reviewer._id,
      username: reviewer.name,
      email: reviewer.email,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error in signup" });
  }
});

// LOGIN user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Incoming body:", req.body);
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const reviewer = await Reviewer.findOne({ email });
    if (!reviewer || !(await reviewer.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(reviewer._id);

    res.status(200).json({
      userID: reviewer._id,
      username: reviewer.name,
      email: reviewer.email,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error in login" });
  }
});

module.exports = router;
