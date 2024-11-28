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
import { useNavigate, useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import axios from "../../axios"; // Import axios
import Cookies from "js-cookie";

const Campaign = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();
  const [newCampaign, setNewCampaign] = useState({
    name: "",
  });
  useEffect(() => {
    // Gọi API
    

    fetchCampaigns();
  }, []);
  const fetchCampaigns = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get("/campaigns/get", {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      });
      setCampaigns(response.data); // Cập nhật dữ liệu chiến dịch
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };
  const handleAddCampaign = async () => {
    // Kiểm tra dữ liệu nhập vào
    if (!newCampaign.name) {
      alert("Vui lòng điền đủ thông tin liên hệ!");
      return;
    }
  
    try {
      const token = Cookies.get("token");
      const response = await axios.post(
        "/campaigns/add",
        newCampaign, // Dữ liệu gửi lên
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json", // Đảm bảo định dạng JSON
          },
        }
      );
      // Cập nhật danh sách liên hệ
      fetchCampaigns()
      // Đặt lại dữ liệu liên hệ mới
      setNewCampaign({ name: "", email: "", phone: "", is_unsubscribed: false });
      // Đóng form
      setOpen(false);
    } catch (error) {
      console.error("Error adding contact:", error);
      if (error.response) {
        alert(`Lỗi: ${error.response.data.message || "Không thể thêm !"}`);
      } else {
        alert("Lỗi không xác định khi thêm !");
      }
    }
  };
  const handleRowClick = (campaignId) => {
    navigate(`/campaign-details/${campaignId}`);
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
        Quản lý Chiến Dịch
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
          onClick={() => setOpen(true)}
        >
          Thêm chiến dịch
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
                Tên chiến dịch
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Mẫu email
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Trạng thái
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Bắt đầu lúc
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Tạo lúc
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {campaigns
              .filter((campaign) =>
                campaign.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((campaign, index) => (
                <TableRow
                  key={index}
                  onClick={() => handleRowClick(campaign.campaign_id)} // Chuyển hướng đến trang chi tiết
                  style={{ cursor: 'pointer' }} // Thêm con trỏ chuột dạng pointer
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#f5f5f5", // Màu nền khi hover
                    },
                  }}
                >
                  <TableCell align="left">{campaign.name || "Chưa đặt tên"}</TableCell>
                  <TableCell align="left">{campaign.subject || "-"}</TableCell>
                  <TableCell align="left">{campaign.status || "-"}</TableCell>
                  <TableCell align="left">
                    {campaign.send_at ? new Date(campaign.send_at).toLocaleString() : "-"}
                  </TableCell>
                  <TableCell align="left">
                    {campaign.created_at ? new Date(campaign.created_at).toLocaleString() : "-"}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>

        </Table>
      </TableContainer>

      {/* Dialog thêm chiến dịch */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Thêm chiến dịch</DialogTitle>
        <DialogContent>
          <TextField
            label="Tên chiến dịch"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newCampaign.phone}
            onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleAddCampaign} color="primary">Thêm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Campaign;
