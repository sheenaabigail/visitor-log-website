const entryModel = require('../models/entryModel');

const showAllEntries = (req, res) => {
  entryModel.getAllEntries((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

const InsertEntry = (req, res) => {
  const visitorData = req.body;
  entryModel.Signup(visitorData, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Entry added successfully!", ...results });
  });
};

const updateEntry = (req, res) => {
  const logId = req.params.logId;
  const updatedData = req.body;

  entryModel.updateEntryById(logId, updatedData, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Entry updated successfully!", ...results });
  });
};

const deleteEntry = (req, res) => {
  const logId = req.params.logId;

  entryModel.deleteEntryById(logId, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Entry deleted successfully!" });
  });
};

module.exports = {
  showAllEntries,
  InsertEntry,
  updateEntry,
  deleteEntry,
};

