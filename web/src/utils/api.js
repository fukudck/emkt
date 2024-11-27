// src/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000', // Thay đổi URL theo backend của bạn
});

export default api;