import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import Cookies from "js-cookie"

const CampaignStatistics = () => {
  const [campaignStats, setCampaignStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCampaignStatistics = async () => {
    const token = Cookies.get("token"); // Lấy token từ cookies
    
    if (!token) {
      console.error("Token không tồn tại. Vui lòng đăng nhập lại.");
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.get('statistics/campaign', {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm Bearer token
        },
      });
      console.log(response);
      setCampaignStats(response.data.data);
    } catch (err) {
      console.error('Error fetching campaign statistics:', err);
      if (err.response?.status === 401) {
        console.error('Token không hợp lệ hoặc hết hạn. Vui lòng đăng nhập lại.');
      }
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchCampaignStatistics();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Thống kê chiến dịch</h2>
      {/* Biểu đồ */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={campaignStats} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="campaign_name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_contacts" fill="#8884d8" name="Tổng liên hệ" />
          <Bar dataKey="viewed_contacts" fill="#82ca9d" name="Liên hệ đã xem" />
        </BarChart>
      </ResponsiveContainer>

      {/* Bảng thống kê */}
      <table>
        <thead>
          <tr>
            <th>Tên chiến dịch</th>
            <th>Tổng liên hệ</th>
            <th>Liên hệ đã xem</th>
            <th>Tỷ lệ xem (%)</th>
          </tr>
        </thead>
        <tbody>
          {campaignStats.map((stat) => (
            <tr key={stat.campaign_id}>
              <td>{stat.campaign_name}</td>
              <td>{stat.total_contacts}</td>
              <td>{stat.viewed_contacts}</td>
              <td>{parseFloat(stat.view_rate).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CampaignStatistics;
