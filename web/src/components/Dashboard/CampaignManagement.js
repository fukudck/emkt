import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
  TableContainer,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

const CampaignManagement = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [emails, setEmails] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email_id: "",
    send_at: "",
  });

  // Lấy danh sách chiến dịch
  const fetchCampaigns = async () => {
    try {
      const response = await axios.get("/api/campaigns");
      setCampaigns(response.data);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  // Lấy danh sách email mẫu
  const fetchEmails = async () => {
    try {
      const response = await axios.get("/api/emails");
      setEmails(response.data);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  // Gửi yêu cầu tạo chiến dịch mới
  const handleCreateCampaign = async () => {
    try {
      await axios.post("/api/campaigns/create", formData);
      setOpenDialog(false);
      fetchCampaigns(); // Lấy lại danh sách chiến dịch
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };

  // Xóa chiến dịch
  const handleDeleteCampaign = async (id) => {
    try {
      await axios.delete(`/api/campaigns/${id}`);
      fetchCampaigns(); // Lấy lại danh sách chiến dịch
    } catch (error) {
      console.error("Error deleting campaign:", error);
    }
  };

  // Hiển thị danh sách chiến dịch khi component mount
  useEffect(() => {
    fetchCampaigns();
    fetchEmails();
  }, []);

  // Mở form tạo chiến dịch
  const handleOpenDialog = () => {
    setFormData({ name: "", email_id: "", send_at: "" }); // Reset form
    setOpenDialog(true);
  };

  // Đóng form
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Cập nhật dữ liệu trong form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* Tiêu đề chính */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 4,
          color: "primary.main",
        }}
      >
        Quản lý chiến dịch Email
      </Typography>

      {/* Nút tạo chiến dịch */}
      <Box sx={{ textAlign: "right", marginBottom: 3 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleOpenDialog}
        >
          Tạo chiến dịch mới
        </Button>
      </Box>

      {/* Bảng danh sách chiến dịch */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
                Tên chiến dịch
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
                Email Mẫu
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
                Gửi lúc
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
                Ngày tạo
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow hover key={campaign.campaign_id}>
                <TableCell>{campaign.name}</TableCell>
                <TableCell>{campaign.email_id}</TableCell>
                <TableCell>{campaign.send_at}</TableCell>
                <TableCell>{campaign.created_at}</TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteCampaign(campaign.campaign_id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog để tạo chiến dịch mới */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Tạo chiến dịch mới</DialogTitle>
        <DialogContent>
          <TextField
            label="Tên chiến dịch"
            fullWidth
            margin="normal"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            label="Email Mẫu"
            select
            fullWidth
            margin="normal"
            name="email_id"
            value={formData.email_id}
            onChange={handleInputChange}
          >
            {emails.map((email) => (
              <MenuItem key={email.email_id} value={email.email_id}>
                {email.subject}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Ngày gửi"
            type="datetime-local"
            fullWidth
            margin="normal"
            name="send_at"
            value={formData.send_at}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleCreateCampaign} color="primary">
            Tạo chiến dịch
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CampaignManagement;
