import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const EmailMarketing = () => {
  const [open, setOpen] = useState(false);
  const [campaigns] = useState([
    { id: 1, name: "Mẫu Email 1", description: "Khuyến mãi 50%", type: "Mẫu" },
    { id: 2, name: "Chiến dịch 1", description: "Giới thiệu sản phẩm mới", type: "Chiến dịch" },
  ]);

  const [groups] = useState([
    { id: 1, name: "Nhóm Khách hàng VIP" },
    { id: 2, name: "Nhóm Khách hàng thường xuyên" },
    { id: 3, name: "Nhóm Đối tác doanh nghiệp" },
  ]);

  const [selectedGroups, setSelectedGroups] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const toggleGroup = (groupId) => {
    if (selectedGroups.includes(groupId)) {
      setSelectedGroups(selectedGroups.filter((id) => id !== groupId));
    } else {
      setSelectedGroups([...selectedGroups, groupId]);
    }
  };

  const handleConfirmGroups = () => {
    alert(`Đã chọn nhóm: ${selectedGroups.map((id) => groups.find((g) => g.id === id).name).join(", ")}`);
    setOpen(false);
  };

  return (
    <Box
      sx={{
        maxWidth: "900px",
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
          src="https://img.freepik.com/free-vector/email-marketing-flat-icon_1262-18803.jpg"
          alt="Email Marketing"
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
        Quản lý Email Marketing
      </Typography>

      {/* Danh sách chiến dịch/mẫu */}
      <Typography variant="h6" sx={{ marginBottom: 2, color: "#34495e" }}>
        Danh sách Chiến dịch và Mẫu Email
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                ID
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Tên
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Loại
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Mô tả
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell align="center">{campaign.id}</TableCell>
                <TableCell align="center">{campaign.name}</TableCell>
                <TableCell align="center">{campaign.type}</TableCell>
                <TableCell align="center">{campaign.description}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleOpen}
                  >
                    Thêm liên hệ
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog Thêm nhóm liên hệ */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Chọn nhóm liên hệ</DialogTitle>
        <DialogContent>
          {groups.map((group) => (
            <FormControlLabel
              key={group.id}
              control={
                <Checkbox
                  checked={selectedGroups.includes(group.id)}
                  onChange={() => toggleGroup(group.id)}
                />
              }
              label={group.name}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleConfirmGroups} color="primary">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmailMarketing;
