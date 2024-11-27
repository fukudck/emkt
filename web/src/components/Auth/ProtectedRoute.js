import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  // Lấy token từ localStorage (hoặc có thể từ cookie, Redux, Context API, ...)
  const token = Cookies.get('token');

  // Nếu không có token, chuyển hướng về trang đăng nhập
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
