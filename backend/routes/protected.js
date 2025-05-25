const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

router.get('/home', authenticateToken, (req, res) => {
  res.json({ message: `Welcome to your home page` });
});

router.get('/visitorlog', authenticateToken, (req, res) => {
// console.log("")
  res.json({ message: `Visitor Log backend`});
  console.log("response message");
});

module.exports = router;
