const Group = require("../models/groupModel");

const groupController = {
  // Lấy danh sách nhóm
  getAllGroups: async (req, res) => {
    try {
      const groups = await Group.getAll();
      res.status(200).json(groups);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy danh sách nhóm", error });
    }
  },

  // Thêm nhóm mới
  createGroup: async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ message: "Tên nhóm là bắt buộc" });
      }
      const result = await Group.create({ name, created_at: new Date() });
      res.status(201).json({ message: "Thêm nhóm thành công", groupId: result.insertId });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi thêm nhóm", error });
    }
  },

  // Lấy chi tiết nhóm
  getGroupById: async (req, res) => {
    try {
      const { id } = req.params;
      const group = await Group.getById(id);
      if (!group) {
        return res.status(404).json({ message: "Không tìm thấy nhóm" });
      }
      res.status(200).json(group);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy nhóm", error });
    }
  },

  // Cập nhật nhóm
  updateGroup: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const result = await Group.update(id, { name, created_at: new Date() });
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Không tìm thấy nhóm để cập nhật" });
      }
      res.status(200).json({ message: "Cập nhật nhóm thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi cập nhật nhóm", error });
    }
  },

  // Xóa nhóm
  deleteGroup: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Group.delete(id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Không tìm thấy nhóm để xóa" });
      }
      res.status(200).json({ message: "Xóa nhóm thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi xóa nhóm", error });
    }
  },

  // Lấy danh sách liên hệ của một nhóm
  getGroupContacts: async (req, res) => {
    try {
      const { id } = req.params;
      const contacts = await Group.getGroupContacts(id);
      res.status(200).json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy danh sách liên hệ của nhóm", error });
    }
  },

// Thêm liên hệ vào nhóm
addContactToGroup: async (req, res) => {
  // try {
  //   const { id } = req.params; // Lấy groupId từ URL params
  //   const { contactId } = req.body; // Lấy contactId từ body request
  //   console.log("Group ID:", id);
  //   console.log("Contact ID:", contactId);
  //   // Kiểm tra id và contactId có tồn tại hay không
  //   if (!id || !contactId) {
  //     return res.status(400).json({ message: "Thiếu thông tin groupId hoặc contactId" });
  //   }

  //   // Kiểm tra nhóm có tồn tại không
  //   const group = await Group.getById(id);
  //   if (!group) {
  //     return res.status(404).json({ message: "Không tìm thấy nhóm" });
  //   }

  //   // Thêm liên hệ vào nhóm
  //   const result = await Group.addContactToGroup(id, contactId);

  //   res.status(201).json({
  //     message: "Thêm liên hệ vào nhóm thành công",
  //     data: { groupId: id, contactId }
  //   });
  // } catch (error) {
  //   res.status(500).json({ message: "Lỗi khi thêm liên hệ vào nhóm", error });
  // }
  // test
  try {
    const { id } = req.params; // groupId
    const { contactId } = req.body;

    if (!id || !contactId) {
      return res.status(400).json({ message: "Thiếu thông tin groupId hoặc contactId" });
    }

    // Kiểm tra và thêm liên hệ
    const result = await Group.addContactToGroup(id, contactId);

    if (result.alreadyExists) {
      return res.status(200).json({
        message: "Liên hệ đã tồn tại trong nhóm",
        data: { groupId: id, contactId },
      });
    }

    res.status(201).json({
      message: "Thêm liên hệ vào nhóm thành công",
      data: { groupId: id, contactId },
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi thêm liên hệ vào nhóm", error });
  }
},
  
};

module.exports = groupController;
