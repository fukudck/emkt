const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
const mailRoutes = require('./routes/mailRoutes');
const campaignRoutes = require('./routes/campaignRoutes');

const app = express();


app.use(express.json()); // Sử dụng express.json() thay vì body-parser
app.use(cors());
app.use('/api/auth', authRoutes);  
app.use('/api/users', userRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/mail', mailRoutes);
app.use('/api/campaigns', campaignRoutes);

// Xử lý các lỗi không tìm thấy route (404)
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
  });
  
  // Khởi động server và lắng nghe cổng
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });