const Contact = require('../models/contactModel.js');

exports.getContacts = async (req, res) => {
    if (req.user.user_type !== 'admin') {
        return res.status(403).json({ message: "Admin Only!" });
    }
    try {
      const contacts = await Contact.getContacts();  
      res.status(200).json({ success: true, data: contacts });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
};

exports.getContactGroups = async (req, res) => {
    if (req.user.user_type !== 'admin') {
        return res.status(403).json({ message: "Admin Only!" });
    }
    try {
      const contacts = await Contact.getContactGroups();  
      res.status(200).json({ success: true, data: contacts });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
};