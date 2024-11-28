const db = require('../config/db.js'); 

exports.getUsers = () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users', (err, results) => {
        if (err) {
          return reject(err); // Trả về lỗi nếu có
        }
        resolve(results); // Trả về kết quả nếu thành công
      });
    });
};

// Thêm người dùng mới
exports.addUser = (name, email, password_hash, user_type) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO users (name, email, password_hash, user_type) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, password_hash, user_type], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

// Cập nhật người dùng
exports.updateUser = (user_id, name, email, user_type) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE users SET name = ?, email = ?, user_type = ? WHERE user_id = ?';
    db.query(query, [name, email, user_type, user_id], (err, result) => {
      if (err) {
        return reject(err); // Trả về lỗi nếu có
      }
      resolve(result); // Trả về kết quả nếu thành công
    });
  });
};

// Xóa người dùng
exports.deleteUser = (user_id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM users WHERE user_id = ?';
    db.query(query, [user_id], (err, result) => {
      if (err) {
        return reject(err); // Trả về lỗi nếu có
      }
      resolve(result); // Trả về kết quả nếu thành công
    });
  });
};
