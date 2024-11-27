const Contact = require("../models/contactModel");

const contactController = {
  // Lấy danh sách liên hệ
  getAllContacts: async (req, res) => {
    try {
      const contacts = await Contact.getAll();
      res.status(200).json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy danh sách liên hệ", error });
    }
  },

  // Thêm liên hệ mới
  createContact: async (req, res) => {
    try {
      const { email, name, phone } = req.body;
      if (!email || !name) {
        return res.status(400).json({ message: "Email và tên là bắt buộc" });
      }
      const result = await Contact.create({ email, name, phone });
      res.status(201).json({ message: "Thêm liên hệ thành công", contactId: result.insertId });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi thêm liên hệ", error });
    }
  },

  // Lấy chi tiết liên hệ
  getContactById: async (req, res) => {
    try {
      const { id } = req.params;
      const contact = await Contact.getById(id);
      if (!contact) {
        return res.status(404).json({ message: "Không tìm thấy liên hệ" });
      }
      res.status(200).json(contact);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy liên hệ", error });
    }
  },

  // Cập nhật liên hệ
  updateContact: async (req, res) => {
    try {
      const { id } = req.params;
      const { email, name, phone } = req.body;
      const result = await Contact.update(id, { email, name, phone });
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Không tìm thấy liên hệ để cập nhật" });
      }
      res.status(200).json({ message: "Cập nhật liên hệ thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi cập nhật liên hệ", error });
    }
  },

  // Xóa liên hệ
  deleteContact: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Contact.delete(id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Không tìm thấy liên hệ để xóa" });
      }
      res.status(200).json({ message: "Xóa liên hệ thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi xóa liên hệ", error });
    }
  },
};

module.exports = contactController;
