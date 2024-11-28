const Statistics = require('../models/statisticsModel');

exports.getCampaignStatistics = async (req, res) => {
  try {
    console.log('Bắt đầu lấy thống kê chiến dịch');

    // Gọi model để lấy dữ liệu
    const statistics = await Statistics.getCampaignStatistics();

    console.log('Kết quả từ model:', statistics);

    res.status(200).json({
      success: true,
      data: statistics,
    });
  } catch (err) {
    console.error('Lỗi trong Controller:', err);
    res.status(500).json({
      success: false,
      message: 'Không thể lấy thống kê chiến dịch',
      error: err.message,
    });
  }
};
