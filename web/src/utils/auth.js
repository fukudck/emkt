// src/services/auth.js
import axios from 'axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

// Địa chỉ API của backend
const API_URL = 'http://localhost:5000/api/auth';

// Đăng ký người dùng
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data; // Trả về dữ liệu sau khi đăng ký thành công
  } catch (error) {
    console.error("Đăng ký thất bại:", error);
    throw error.response?.data || error.message; // Ném lỗi để frontend xử lý
  }
};

// Đăng nhập người dùng
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);

    if (response.status === 200) {
      const { message, user, token } = response.data;

      // Lưu token vào Cookie với thời hạn 1 giờ
      Cookies.set('token', token, { expires: 1 / 24 }); // 1/24 là 1 giờ

      return {
        message: 'Đăng nhập thành công',
        user,
        token,
      };
    } else {
      throw new Error('Đăng nhập không thành công.');
    }
  } catch (error) {
    console.error('Đăng nhập thất bại:', error);
    throw error.response?.data || error.message; // Ném lỗi để frontend xử lý
  }
};

// Lấy thông tin người dùng từ token JWT
export const getUser = () => {
  try {
    const token = Cookies.get('token');
    if (!token) return null;

    // Giải mã token để lấy thông tin người dùng
    const user = jwtDecode(token);
    return user;
  } catch (error) {
    console.error('Không thể lấy thông tin người dùng:', error);
    return null; // Trả về null nếu token không hợp lệ
  }
};

// Kiểm tra xem người dùng có đang đăng nhập không
export const isAuthenticated = () => {
  const token = Cookies.get('token');
  return !!token; // Trả về true nếu token tồn tại
};

// Đăng xuất người dùng (xóa token)
export const logout = () => {
  try {
    Cookies.remove('token'); // Xóa token khỏi cookie
    console.log('Đăng xuất thành công');
  } catch (error) {
    console.error('Đăng xuất thất bại:', error);
  }
};
