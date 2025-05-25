const db = require('../database/db');

const getAllEntries = (callback) => {
  const sql = `
    SELECT vl.*, v.VisitorName, v.ContactNo 
    FROM Visitors_log vl
    JOIN Visitors v ON vl.VisitorId = v.VisitorId
  `;

  db.query(sql, callback);
};

const Signup = (visitorData, callback) => {
  db.query(
    'INSERT INTO Visitors (VisitorName, ContactNo) VALUES (?, ?)',
    [visitorData.VisitorName, visitorData.ContactNo],
    (err, visitorResult) => {
      if (err) return callback(err);

      const visitorId = visitorResult.insertId;

      db.query(
        `INSERT INTO Visitors_log 
        (VisitorId, ApartmentNo, VehicleType, VehicleNo, PurposeOfVisit, InTime) 
        VALUES (?, ?, ?, ?, ?, CURRENT_TIME())`,
        [
          visitorId,
          visitorData.ApartmentNo,
          visitorData.VehicleType,
          visitorData.VehicleNo,
          visitorData.PurposeOfVisit,
        ],
        (err, logResult) => {
          if (err) return callback(err);
          callback(null, {
            visitorId: visitorId,
            logId: logResult.insertId,
          });
        }
      );
    }
  );
};

const updateEntryById = (logId, data, callback) => {
  const {
    ApartmentNo,
    VehicleType,
    VehicleNo,
    PurposeOfVisit,
    InTime,
    OutTime,
    visitStatus,
  } = data;

  const sql = `
    UPDATE Visitors_log 
    SET ApartmentNo = ?, VehicleType = ?, VehicleNo = ?, PurposeOfVisit = ?, InTime = ?, OutTime = ?, visitStatus = ?
    WHERE LogId = ?`;

  db.query(
    sql,
    [ApartmentNo, VehicleType, VehicleNo, PurposeOfVisit, InTime, OutTime, visitStatus, logId],
    callback
  );
};

const deleteEntryById = (logId, callback) => {
  const sql = `DELETE FROM Visitors_log WHERE LogId = ?`;
  db.query(sql, [logId], callback);
};

module.exports = {
  getAllEntries,
  Signup,
  updateEntryById,
  deleteEntryById,
};
