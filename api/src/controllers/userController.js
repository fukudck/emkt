const User = require('../models/userModel.js');
const bcrypt = require('bcrypt');
exports.getUsers = async (req, res) => {
    if (req.user.user_type !== 'admin') {
        return res.status(403).json({ message: "Admin Only!" });
    }
    try {
      const users = await User.getUsers();  
      res.status(200).json({ success: true, data: users });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
};

// Thêm người dùng mới
exports.addUser = async (req, res) => {
  const { name, email, password, user_type } = req.body;
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);
  
  
  try {
    // Mã hóa mật khẩu
    const password_hash = await bcrypt.hash(password, 10);

    // Thêm người dùng vào cơ sở dữ liệu
    const result = await User.addUser(name, email, password_hash, user_type);

    res.status(201).json({ success: true, message: 'Thêm người dùng thành công!', data: { user_id: result.insertId } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// Cập nhật thông tin người dùng
exports.updateUser = async (req, res) => {
  const user_id = req.params.id;
  const { name, email, user_type } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (!name || !email || !user_type) {
    return res.status(400).json({ success: false, message: "Dữ liệu không hợp lệ. Vui lòng cung cấp đầy đủ name, email và user_type." });
  }

  // Kiểm tra định dạng email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "Email không hợp lệ." });
  }

  try {
    const result = await User.updateUser(user_id, name, email, user_type);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Người dùng không tồn tại.' });
    }

    res.status(200).json({ success: true, message: 'Cập nhật thông tin người dùng thành công!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// Xóa người dùng
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await User.deleteUser(userId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Người dùng không tồn tại.' });
    }
    res.status(200).json({ success: true, message: 'Xóa người dùng thành công!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
