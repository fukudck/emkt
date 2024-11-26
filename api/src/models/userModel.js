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