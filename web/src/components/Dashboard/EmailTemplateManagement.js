import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import axios from "../../axios"; // Import axios
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Campaign = () => {
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get("mail/get", {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      });
      setEmail(response.data); // Cập nhật dữ liệu chiến dịch
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };
  const handleDelete = async (id) => {
    if (!id) {
      alert("Không xác định được mẫu cần xóa!");
      return;
    }
    if (!window.confirm("Bạn có chắc chắn muốn xóa mẫu này?")) {
      return;
    }
    const token = Cookies.get('token');    
    try {
      // Gửi yêu cầu xóa liên hệ bằng phương thức DELETE
      await axios.delete(`mail/delete/${id}`, {
        headers: {
          "Content-Type": "application/json", // Đảm bảo định dạng JSON
          "Authorization": `Bearer ${token}`
        },
      });
  
      // Hiển thị thông báo thành công
      alert("Xóa mẫu thành công!");
  
      // Cập nhật danh sách liên hệ sau khi xóa
      fetchEmails();
    } catch (error) {
      console.error("Error deleting contact:", error);
      if (error.response) {
        alert(`Lỗi: ${error.response.data.message || "Không thể xóa liên hệ!"}`);
      } else {
        alert("Lỗi không xác định khi xóa liên hệ!");
      }
    }
  };
  const handleEditClick = (id) => {
    navigate("/email-template/editor", {
      state: { isEdit: true, email_id: id }, // Truyền thêm email_id vào state
    });
  };

  return (
    <Box
      sx={{
        maxWidth: "100%",
        margin: "20px auto",
        padding: 3,
        border: "1px solid #ddd",
        borderRadius: "12px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Logo */}
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 3 }}>
        <Avatar
          src="https://img.freepik.com/free-vector/communication-flat-icon_1262-18771.jpg"
          alt="Logo"
          sx={{ width: 80, height: 80 }}
        />
      </Box>

      {/* Tiêu đề */}
      <Typography
        variant="h4"
        sx={{
          marginBottom: 3,
          fontWeight: "bold",
          color: "#2c3e50",
          textAlign: "center",
        }}
      >
        Quản lý Mẫu Email
      </Typography>

      {/* Cụm nút */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 1,
          marginBottom: 3,
        }}
      >
        
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          sx={{ textTransform: "none", fontWeight: "bold", padding: "6px 16px" }}
          onClick={() => navigate(`${location.pathname}/editor`)}
        >
          Thêm mẫu
        </Button>
        
      </Box>

      {/* Tìm kiếm */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: 3,
          gap: 1,
        }}
      >
        <IconButton
          color="primary"
          sx={{
            backgroundColor: "#e3f2fd",
            "&:hover": { backgroundColor: "#bbdefb" },
          }}
        >
          <SearchIcon />
        </IconButton>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Tìm kiếm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
          }}
        />
        
      </Box>

      {/* Bảng */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Tên Mẫu
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Chủ đề
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Tạo lúc
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Thao tác
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
            {email
                .filter((email) =>
                    email.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((email, index) => (
                    <TableRow key={index}>
                    <TableCell align="left">{email.name}</TableCell>
                    <TableCell align="left">{email.subject}</TableCell>
                    <TableCell align="left">
                        {new Date(email.created_at).toLocaleString()}
                    </TableCell>
                    <TableCell align="center"><><EditIcon  onClick={() => handleEditClick(email.email_id)} style={{ cursor: 'pointer', marginRight: 8 }}/><DeleteIcon onClick={() => handleDelete(email.email_id)} style={{ cursor: 'pointer', marginRight: 8 }} /></></TableCell>
                    </TableRow>
                ))}
            
          </TableBody>
        </Table>
      </TableContainer>

      
    </Box>
  );
};

export default Campaign;
