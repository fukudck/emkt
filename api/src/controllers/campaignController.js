const Campaign = require("../models/campaignModel");
const nodemailer = require("nodemailer");
const db = require("../config/dbPool");
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'emerson.morissette51@ethereal.email',
      pass: 'th2x3uny4751H931d4'
  }
});

const campaignController = {
  get: async (req, res) => {
    try {
      const { campaign_id } = req.query; // Lấy campaign_id từ query string
  
      if (campaign_id) {
        // Nếu có campaign_id, gọi getByID
        const campaign = await Campaign.getByID(campaign_id);
        if (campaign) {
          res.status(200).json(campaign);
        } else {
          res.status(404).json({ message: "Chiến dịch không tồn tại." });
        }
      } else {
        // Nếu không có campaign_id, gọi get
        const campaigns = await Campaign.get();
        res.status(200).json(campaigns);
      }
    } catch (error) {
      res.status(500).json({ message: "Có lỗi xảy ra! Lỗi: ", error });
    }
  },
  add: async (req, res) => {
    try {
      const { name, email_id, send_at, status } = req.body;

      if (!name) {
        return res.status(400).json({ message: "Thiếu dữ liệu đầu vào: name." });
      }

      const result = await Campaign.add({ name, email_id, send_at, status });
      res.status(201).json({ message: "Thêm chiến dịch thành công!", campaign_id: result.insertId });
    } catch (error) {
      res.status(500).json({ message: "Có lỗi xảy ra khi thêm chiến dịch!", error });
    }
  },

  update: async (req, res) => {
    const { campaign_id, name, email_id, groups_ids } = req.body;

    try {
      // Kiểm tra dữ liệu đầu vào
      if (!campaign_id || !name || !email_id || !Array.isArray(groups_ids)) {
        return res.status(400).json({ message: "Thiếu dữ liệu đầu vào hoặc groups_ids không hợp lệ." });
      }

      // Cập nhật chiến dịch
      const result = await Campaign.update({ campaign_id, name, email_id, groups_ids });
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Chiến dịch không tồn tại hoặc không có thay đổi." });
      }

      // Nếu cập nhật thành công, trả về thông báo
      res.status(200).json({ message: "Cập nhật chiến dịch thành công!" });
    } catch (error) {
      res.status(500).json({ message: "Có lỗi xảy ra khi cập nhật chiến dịch!", error });
    }
  },


  delete: async (req, res) => {
    try {
      const { campaign_id } = req.body;

      if (!campaign_id) {
        return res.status(400).json({ message: "Thiếu campaign_id." });
      }

      const result = await Campaign.delete(campaign_id);
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Chiến dịch không tồn tại." });
      } else {
        res.status(200).json({ message: "Xóa chiến dịch thành công!" });
      }
    } catch (error) {
      res.status(500).json({ message: "Có lỗi xảy ra khi xóa chiến dịch!", error });
    }
  },
  startCampaign : async (req, res) => {
    const { campaign_id } = req.body; // Campaign ID sẽ được truyền từ client
  
    try {
      // Bước 1: Lấy thông tin chiến dịch từ bảng campaigns
      const [campaigns] = await db.query('SELECT * FROM campaigns WHERE campaign_id = ?', [campaign_id]);
      if (!campaigns.length) {
        return res.status(404).json({ error: "Campaign không tồn tại" });
      }
  
      const campaign = campaigns[0];
  
      // Cập nhật trạng thái campaign thành "Pending" ngay lập tức
      await db.query('UPDATE campaigns SET status = ?, send_at = NOW() WHERE campaign_id = ?', ['Pending', campaign_id]);
  
      // Bước 2: Lấy thông tin nhóm liên quan đến campaign_id từ bảng campaign_groups
      const [groupContacts] = await db.query(`
        SELECT c.email 
        FROM group_contacts gc
        JOIN contacts c ON gc.contact_id = c.contact_id
        WHERE gc.group_id IN (SELECT group_id FROM campaign_groups WHERE campaign_id = ?)
        AND c.is_unsubscribed = 0`, // Lọc các liên hệ không hủy đăng ký
      [campaign_id]);
  
      const emails = groupContacts.map(contact => contact.email).join(", ");
  
      if (!emails) {
        return res.status(404).json({ error: "Không có người nhận hợp lệ cho chiến dịch này." });
      }
  
      // Bước 3: Lấy subject và content từ bảng emails dựa trên email_id của campaign
      const [emailTemplates] = await db.query('SELECT * FROM emails WHERE email_id = ?', [campaign.email_id]);
      if (!emailTemplates.length) {
        return res.status(404).json({ error: "Email template không tồn tại" });
      }
  
      const emailTemplate = emailTemplates[0];
      
      // Bước 4: Gửi email trong nền (background)
      sendEmailInBackground(campaign_id, emails, emailTemplate.subject, emailTemplate.content);
  
      // Trả lời ngay lập tức rằng chiến dịch đã bắt đầu
      res.status(200).json({ message: "Chiến dịch đã được bắt đầu và email đang được gửi!" });
    } catch (error) {
      console.error("Error starting campaign: ", error);
      res.status(500).json({ error: "Đã có lỗi xảy ra khi bắt đầu chiến dịch." });
    }
  }
  
};
const sendEmailInBackground = async (campaign_id, emails, subject, content) => {
  try {
    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // Người gửi
      to: emails, // Người nhận (danh sách email)
      subject: subject, // Subject từ email template
      text: content, // Nội dung email (text)
      html: content, // Nội dung email (html)
    });

    console.log("Message sent: %s", info.messageId);

    // Cập nhật trạng thái campaign thành "Complete" sau khi gửi email thành công
    await db.query('UPDATE campaigns SET status = ? WHERE campaign_id = ?', ['Complete', campaign_id]);
  } catch (error) {
    console.error("Error sending email in background: ", error);
    
    // Cập nhật trạng thái campaign thành "Draft" nếu có lỗi
    await db.query('UPDATE campaigns SET status = ? WHERE campaign_id = ?', ['Draft', campaign_id]);
  }
};
module.exports = campaignController;