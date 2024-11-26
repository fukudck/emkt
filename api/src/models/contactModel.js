const db = require('../config/db.js'); 

exports.getContacts = () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM contacts', (err, results) => {
        if (err) {
          return reject(err); // Trả về lỗi nếu có
        }
        resolve(results); // Trả về kết quả nếu thành công
      });
    });
};

exports.getContactGroups = () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM groups', (err, results) => {
        if (err) {
          return reject(err); // Trả về lỗi nếu có
        }
        resolve(results); // Trả về kết quả nếu thành công
      });
    });
};