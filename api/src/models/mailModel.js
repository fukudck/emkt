const db = require("../config/db"); // Kết nối tới MySQL
const { getById } = require("./contactModel");

const mailModel = {
  // Lấy tất cả liên hệ
  get: () => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM emails";
      db.query(query, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },
  getById: async (id) => {
    try {
      const query = "SELECT * FROM emails WHERE email_id = ?";
      const [results] = await db.promise().query(query, [id]); // Sử dụng db.promise() để hỗ trợ async/await
      if (results.length === 0) {
        return null; // Nếu không tìm thấy, trả về null
      }
      return results[0]; // Trả về mail đầu tiên nếu tìm thấy
    } catch (err) {
      throw err; // Nếu có lỗi, ném lỗi
    }
  },
  
  

  add: (mail) => {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO emails (name, subject, content) VALUES (?, ?, ?)";
      db.query(query, [mail.name, mail.subject, mail.content], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM emails WHERE email_id = ?";
      db.query(query, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },
  update: (id, mail) => {
    return new Promise((resolve, reject) => {
      const query = "UPDATE emails SET name = ?, subject = ?, content = ? WHERE email_id = ?";
      db.query(query, [mail.name, mail.subject, mail.content, id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },
  

  
};

module.exports = mailModel;
