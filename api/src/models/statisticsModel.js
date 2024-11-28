const db = require('../config/db.js');

exports.getCampaignStatistics = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        c.campaign_id,
        c.name AS campaign_name,
        COUNT(DISTINCT gi.contact_id) AS total_contacts,
        COUNT(DISTINCT ei.contact_id) AS viewed_contacts,
        (CASE 
           WHEN COUNT(DISTINCT gi.contact_id) = 0 THEN 0
           ELSE (COUNT(DISTINCT ei.contact_id) / COUNT(DISTINCT gi.contact_id)) * 100
         END) AS view_rate
      FROM campaigns c
      LEFT JOIN campaign_groups cg ON c.campaign_id = cg.campaign_id
      LEFT JOIN group_contacts gi ON cg.group_id = gi.group_id
      LEFT JOIN email_interactions ei ON c.campaign_id = ei.campaign_id
      GROUP BY c.campaign_id, c.name;
    `;

    db.query(query, (err, results) => {
      if (err) {
        return reject(err); // Trả lỗi nếu có
      }
      resolve(results); // Trả về kết quả nếu thành công
    });
  });
};
