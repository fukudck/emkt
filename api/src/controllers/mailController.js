const Mail = require("../models/mailModel");

const mailController = {
    getMails: async (req, res) => {
      try {
        const { email_id } = req.query; // Kiểm tra query parameter email_id
        if (email_id) {
          // Nếu có email_id, gọi hàm lấy mail theo ID
          const mail = await Mail.getById(email_id);
          if (mail) {
            return res.status(200).json(mail); // Trả về mail theo ID
          } else {
            return res.status(404).json({ message: "Mail không tìm thấy!" });
          }
        } else {
          // Nếu không có email_id, gọi hàm lấy tất cả mail
          const mails = await Mail.get();
          res.status(200).json(mails); // Trả về tất cả mail
        }
      } catch (error) {
        res.status(500).json({ message: "Có lỗi xảy ra! Lỗi: ", error });
      }
    },
    addMail: async (req, res) => {
      try {
        const { name, subject, content } = req.body;
        const mails = await Mail.add({ name, subject, content });
        res.status(201).json({ message: "Thêm Mail thành công" });
      } catch (error) {
        res.status(500).json({ message: "Có lỗi xảy ra! Lỗi: ", error });
      }
    },
    deleteMail: async (req, res) => {
      try {
        const { id } = req.params;
        const result = await Mail.delete(id);
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Không tìm thấy ID Email để xóa" });
        }
        res.status(200).json({ message: "Xóa Email thành công" });
      } catch (error) {
        res.status(500).json({ message: "Lỗi khi xóa Email", error });
      }
    },
    updateMail: async (req, res) => {
      try {
        const { id } = req.params; // Lấy id từ params
        const { name, subject, content } = req.body; // Lấy các trường cần sửa từ body
    
        // Gọi hàm update trong model để thực hiện cập nhật
        const result = await Mail.update(id, { name, subject, content });
    
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Mail không tìm thấy" });
        }
    
        res.status(200).json({ message: "Cập nhật mail thành công" });
      } catch (error) {
        res.status(500).json({ message: "Có lỗi xảy ra! Lỗi: ", error });
      }
    },
};



  
module.exports = mailController;