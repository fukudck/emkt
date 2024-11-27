import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "../../axios";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);  // Trạng thái xác thực
  const token = Cookies.get('token');  // Lấy token từ cookies

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        try {
          const response = await axios.get("/auth/profile", {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            setIsAuthenticated(true);  // Nếu response 200, xác nhận là người dùng đã đăng nhập
          } else {
            setIsAuthenticated(false);  // Nếu không phải 200, coi như token không hợp lệ
          }
        } catch (error) {
          if (error.response && error.response.status === 401) {
            setIsAuthenticated(false);  // Nếu token không hợp lệ, chuyển hướng về login
          } else {
            setIsAuthenticated(false);  // Bất kỳ lỗi nào cũng coi như không xác thực
          }
        }
      } else {
        setIsAuthenticated(false);  // Nếu không có token, coi như chưa đăng nhập
      }
    };

    checkToken();
  }, [token]);  // Chạy lại nếu token thay đổi

  // Kiểm tra trạng thái xác thực và thực hiện điều hướng
  if (isAuthenticated === null) {
    return <div>Loading...</div>;  // Chờ kết quả từ API
  }

  return isAuthenticated ? children : <Navigate to="/login" />;  // Chuyển hướng nếu không xác thực
};

export default ProtectedRoute;
