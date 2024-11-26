const User = require('../models/userModel.js');

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