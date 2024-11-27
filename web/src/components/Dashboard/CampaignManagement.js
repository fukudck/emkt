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

const Campaign = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  useEffect(() => {
    // Gọi API
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

    fetchCampaigns();
  }, []);

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
          color="secondary"
          startIcon={<ArrowBackIcon />}
          sx={{ textTransform: "none", fontWeight: "bold", padding: "6px 16px" }}
        >
          Trở về
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          sx={{ textTransform: "none", fontWeight: "bold", padding: "6px 16px" }}
          onClick={() => setOpen(true)}
        >
          Thêm chiến dịch
        </Button>
        <Button
          variant="contained"
          color="primary"
          endIcon={<SaveIcon />}
          sx={{ textTransform: "none", fontWeight: "bold", padding: "6px 16px" }}
        >
          Lưu
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
        <IconButton
          color="primary"
          sx={{
            backgroundColor: "#e3f2fd",
            "&:hover": { backgroundColor: "#bbdefb" },
          }}
        >
          <SearchIcon />
        </IconButton>
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
                <TableRow key={index}>
                  <TableCell align="left">{campaign.name}</TableCell>
                  <TableCell align="left">{campaign.subject}</TableCell>
                  <TableCell align="left">{campaign.status}</TableCell>
                  <TableCell align="left">
                    {new Date(campaign.created_at).toLocaleString()}
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
          />
          <TextField
            label="Mẫu Email"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Hủy
          </Button>
          <Button color="primary">Thêm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Campaign;
