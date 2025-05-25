const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

require('dotenv').config(); 

const SECRET_KEY = process.env.SECRET_KEY;


const adminUser = {
  a_username: process.env.ADMIN_USERNAME,
  a_password: process.env.ADMIN_PASSWORD
};

// Login
router.post('/login', (req, res) => {
  const { a_username, a_password } = req.body;

  if (a_username === adminUser.a_username && a_password === adminUser.a_password) {
    
    const token = jwt.sign({ a_username }, SECRET_KEY, { expiresIn: '1h' });
    console.log("token created:")
    console.log(token);
    return res.status(200).json({ message: "Login successful", token });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});





module.exports = router;
