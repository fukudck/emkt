const db = require("../config/db"); // Kết nối tới MySQL

const Group = {
  // Lấy tất cả nhóm
  getAll: () => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM groups";
      db.query(query, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },

  // Lấy nhóm theo ID
  getById: (id) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM groups WHERE group_id = ?";
      db.query(query, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result[0]);
      });
    });
  },

  // Thêm nhóm mới
  create: (group) => {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO groups (name, created_at) VALUES (?, ?)";
      db.query(query, [group.name, group.created_at], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },

  // Cập nhật nhóm
  update: (id, group) => {
    return new Promise((resolve, reject) => {
      const query = "UPDATE groups SET name = ?, created_at = ? WHERE group_id = ?";
      db.query(query, [group.name, group.created_at, id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },

  // Xóa nhóm
  delete: (id) => {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM groups WHERE group_id = ?";
      db.query(query, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },

  // Thêm liên hệ vào nhóm
  addContactToGroup: (groupId, contactId) => {
    // return new Promise((resolve, reject) => {
    //   const query = `
    //     INSERT INTO group_contacts (group_id, contact_id)
    //     VALUES (?, ?)
    //   `;
    //   db.query(query, [groupId, contactId], (error, results) => {
    //     if (error) {
    //       return reject(error);
    //     }
    //     resolve(results);
    //   });
    // });

    // test 
    return new Promise((resolve, reject) => {
      // Kiểm tra nếu liên hệ đã tồn tại trong nhóm
      const checkQuery = `
        SELECT * FROM group_contacts
        WHERE group_id = ? AND contact_id = ?
      `;
  
      db.query(checkQuery, [groupId, contactId], (err, results) => {
        if (err) {
          return reject(err);
        }
  
        if (results.length > 0) {
          // Liên hệ đã tồn tại trong nhóm
          resolve({ message: "Contact already exists in group", alreadyExists: true });
        } else {
          // Nếu chưa tồn tại, tiến hành thêm mới
          const insertQuery = `
            INSERT INTO group_contacts (group_id, contact_id)
            VALUES (?, ?)
          `;
  
          db.query(insertQuery, [groupId, contactId], (error, results) => {
            if (error) {
              return reject(error);
            }
            resolve({ message: "Contact added to group successfully", alreadyExists: false });
          });
        }
      });
    });
  },
	

  // Lấy danh sách liên hệ của một nhóm
  getGroupContacts: (groupId) => {
		return new Promise((resolve, reject) => {
			const query = `
				SELECT c.* 
				FROM group_contacts gc
				JOIN contacts c ON gc.contact_id = c.contact_id
				WHERE gc.group_id = ?`;
				
			db.query(query, [groupId], (err, results) => {
				if (err) {
					console.error("Error executing query:", err);
					reject(err);
				} else {
					resolve(results);
				}
			});
		});
	},
	
};

module.exports = Group;
