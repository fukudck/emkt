const db = require("../config/db"); // Kết nối tới MySQL
const promisePool  = require("../config/dbPool"); // Kết nối tới MySQL

const campaignModel = {
  get: () => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT c.campaign_id, c.name, e.subject, c.status, c.created_at, c.send_at, GROUP_CONCAT(g.group_id ORDER BY g.group_id) AS group_ids
        FROM campaigns c
        LEFT JOIN emails e ON c.email_id = e.email_id
        LEFT JOIN campaign_groups g ON c.campaign_id = g.campaign_id
        GROUP BY c.campaign_id, c.name, e.subject, c.status, c.created_at;

      `;
      db.query(query, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },
  
  getByID: async (id) => {
    try {
      const query = `
        SELECT c.campaign_id, c.name, c.email_id, e.subject, c.status, c.created_at, GROUP_CONCAT(g.group_id ORDER BY g.group_id) AS group_ids
        FROM campaigns c
        LEFT JOIN emails e ON c.email_id = e.email_id
        LEFT JOIN campaign_groups g ON c.campaign_id = g.campaign_id
        WHERE c.campaign_id = ?
        GROUP BY c.campaign_id, c.name, e.subject, c.status, c.created_at`;
      const [results] = await db.promise().query(query, [id]); // Sử dụng db.promise() để hỗ trợ async/await
      if (results.length === 0) {
        return null; // Nếu không tìm thấy, trả về null
      }
      return results[0]; // Trả về mail đầu tiên nếu tìm thấy
    } catch (err) {
      throw err; // Nếu có lỗi, ném lỗi
    }
  },
  
  add: async ({ name, email_id, send_at, status }) => {
    try {
      // Kiểm tra nếu không có giá trị, gán là null
      const query = "INSERT INTO campaigns (name, email_id, send_at, status, created_at) VALUES (?, ?, ?, 'Draft', NOW())";
      const [result] = await db.promise().query(query, [name, email_id || null, send_at || null, status || null]);
      return result;
    } catch (err) {
      throw err;
    }
  },
  

  update: async ({ campaign_id, name, email_id, groups_ids }) => {
    const connection = await promisePool.getConnection();
    try {
        await connection.beginTransaction();

        // Cập nhật bảng `campaigns`
        const queryUpdateCampaigns = "UPDATE campaigns SET name = ?, email_id = ? WHERE campaign_id = ?";
        await connection.query(queryUpdateCampaigns, [name, email_id, campaign_id]);

        // Xóa các dòng hiện tại trong `campaign_groups` liên quan đến `campaign_id`
        const queryDeleteGroups = "DELETE FROM campaign_groups WHERE campaign_id = ?";
        await connection.query(queryDeleteGroups, [campaign_id]);

        // Thêm các dòng mới vào `campaign_groups`
        const queryInsertGroups = "INSERT INTO campaign_groups (campaign_id, group_id) VALUES (?, ?)";
        for (const group_id of groups_ids) {
            await connection.query(queryInsertGroups, [campaign_id, group_id]);
        }

        await connection.commit();
        return { success: true };
    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
},


  delete: async (id) => {
    try {
      const query = "DELETE FROM campaigns WHERE campaign_id = ?";
      const [result] = await db.promise().query(query, [id]);
      return result;
    } catch (err) {
      throw err;
    }
  },

  
};

module.exports = campaignModel;
