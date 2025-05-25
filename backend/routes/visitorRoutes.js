const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/visitorController');

router.get('/showall', visitorController.showAllVisitors);
router.post('/visitorlogin', visitorController.visitorLogin);
module.exports = router;
