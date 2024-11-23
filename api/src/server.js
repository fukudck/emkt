const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
app.use(express.json()); // Sử dụng express.json() thay vì body-parser
app.use(cors());


// Xử lý các lỗi không tìm thấy route (404)
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
  });
  
  // Khởi động server và lắng nghe cổng
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });