const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Hàm đăng nhập
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email và mật khẩu là bắt buộc' });
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Lỗi hệ thống' });

    if (results.length === 0) {
      return res.status(400).json({ message: 'Email không tồn tại' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password_hash, (err, isMatch) => {
      if (err) return res.status(500).json({ message: 'Lỗi hệ thống' });

      if (!isMatch) {
        return res.status(400).json({ message: 'Mật khẩu sai' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, user_type: user.user_type },
        'hello_world', // Khóa bí mật cố định
        { expiresIn: '1h' } 
      );

      res.status(200).json({
        message: 'Đăng nhập thành công',
        user: { id: user.id, email: user.email },
        token,
      });
    });
  });
};


// Hàm đăng ký
exports.register = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Tên, email và mật khẩu là bắt buộc' });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: 'Lỗi mã hóa mật khẩu' });

    // Câu truy vấn SQL INSERT
    const query = 'INSERT INTO users (name, email, password_hash, user_type, created_at) VALUES (?, ?, ?, ?, ?)';
    
    const userType = 'regular'; // Giá trị mặc định cho user_type
    const createdAt = new Date(); // Lấy thời gian hiện tại

    db.query(query, [name, email, hashedPassword, userType, createdAt], (err) => {
      if (err) {
        return res.status(500).json({ message: 'Lỗi hệ thống' });
      }

      res.status(201).json({ message: 'Đăng ký thành công' });
    });
  });
};

