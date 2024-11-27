const db = require("../config/db"); // Kết nối tới MySQL

const campaignModel = {
  get: () => {
    return new Promise((resolve, reject) => {
      const query = "SELECT c.name, e.subject, c.status, c.created_at FROM campaigns c JOIN emails e ON c.email_id = e.email_id ";
      db.query(query, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },

  
};

module.exports = campaignModel;
