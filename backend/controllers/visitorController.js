const visitorModel = require('../models/visitorModel');

const showAllVisitors = (req, res) => {
  visitorModel.getAllVisitors((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

const visitorLogin = (req, res) => {
  console.log(req.body);
  const visitordata = req.body;
  if (!visitordata.VisitorName || !visitordata.ContactNo) {
    return res.status(400).json({ message: 'Please provide visitor name and phone number' });
  }
  visitorModel.checkoutVisitor(visitordata,(err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ message: 'Checkout successful', visitor: results[0] });
  });
}
module.exports = {
  showAllVisitors,visitorLogin
};
