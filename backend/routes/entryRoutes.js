const express = require('express');
const router = express.Router();
const entryController = require('../controllers/entryController');

router.get('/showall', entryController.showAllEntries);

router.post('/addentry', entryController.InsertEntry);

router.put('/update/:logId', entryController.updateEntry);

router.delete('/delete/:logId', entryController.deleteEntry);

module.exports = router;
