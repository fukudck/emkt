const db = require("../config/db"); // Kết nối tới MySQL

const Contact = {
  // Lấy tất cả liên hệ
  getAll: () => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM contacts";
      db.query(query, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },

  // Lấy liên hệ theo ID
  getById: (id) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM contacts WHERE contact_id = ?";
      db.query(query, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result[0]);
      });
    });
  },

  // Thêm liên hệ mới
  create: (contact) => {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO contacts (email, name, phone) VALUES (?, ?, ?)";
      db.query(query, [contact.email, contact.name, contact.phone], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },

  // Cập nhật liên hệ
  update: (id, contact) => {
    return new Promise((resolve, reject) => {
      const query = "UPDATE contacts SET email = ?, name = ?, phone = ? WHERE contact_id = ?";
      db.query(query, [contact.email, contact.name, contact.phone, id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },

  // Xóa liên hệ
  delete: (id) => {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM contacts WHERE contact_id = ?";
      db.query(query, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },
};

module.exports = Contact;
