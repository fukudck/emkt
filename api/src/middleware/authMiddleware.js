const jwt = require('jsonwebtoken');

// Middleware kiểm tra token
exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Authorization: Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Token không được cung cấp' });
  }

  jwt.verify(token, 'hello_world', (err, decoded) => { // Sử dụng khóa bí mật cố định
    if (err) {
      return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
    }

    req.user = decoded; // Lưu thông tin người dùng vào req
    next();
  });
};
