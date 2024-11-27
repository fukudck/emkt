import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',  // URL backend của bạn
});

export default axiosInstance;
