const db = require('../database/db');
const getAllVisitors = (callback) => {
  db.query('SELECT * FROM Visitors', callback);
};

const checkoutVisitor = (visitorData, callback) => {
  const sql = `
    UPDATE visitors_log vl join visitors v using (visitorId)
    SET vl.visitStatus = TRUE, vl.outtime = CURRENT_TIME() 
    WHERE v.VisitorName = ? AND v.ContactNo = ?
  `;

  db.query(sql, [visitorData.VisitorName, visitorData.ContactNo], (err, result) => {
    if (err) {
      console.error("Error updating visitor status:", err);
      return callback(err);
    }

    if (result.affectedRows === 0) {
      return callback(null, { message: "No matching visitor found", success: false });
    }

    callback(null, { message: "Visitor checked out successfully", success: true });
  });
};


module.exports = {
  getAllVisitors,checkoutVisitor
};
