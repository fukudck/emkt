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
import SearchIcon from   "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import axios from "../../axios"; // Import axios
import Cookies from "js-cookie";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';const Contact = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
    is_unsubscribed: false,
  });
  const [editContact, setEditContact] = useState({
    contact_id: "",
    name: "",
    email: "",
    phone: "",
  });
  // Gọi API để lấy danh sách liên hệ
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get("/contacts", {headers: {
        
          'Authorization': `Bearer ${token}`, // Định rõ kiểu dữ liệu gửi đi
        }});
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEditOpen(false);

  // Xử lý thêm liên hệ mới
  const handleAddContact = async () => {
    // Kiểm tra dữ liệu nhập vào
    if (!newContact.name || !newContact.email || !newContact.phone) {
      alert("Vui lòng điền đủ thông tin liên hệ!");
      return;
    }
  
    try {
      const token = Cookies.get("token");
      const response = await axios.post(
        "contacts",
        newContact, // Dữ liệu gửi lên
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json", // Đảm bảo định dạng JSON
          },
        }
      );
      // Cập nhật danh sách liên hệ
      fetchContacts()
      // Đặt lại dữ liệu liên hệ mới
      setNewContact({ name: "", email: "", phone: "", is_unsubscribed: false });
      // Đóng form
      setOpen(false);
    } catch (error) {
      console.error("Error adding contact:", error);
      if (error.response) {
        alert(`Lỗi: ${error.response.data.message || "Không thể thêm liên hệ!"}`);
      } else {
        alert("Lỗi không xác định khi thêm liên hệ!");
      }
    }
  };
  const handleEditClick = (contact) => {
    setEditContact(contact);
    setEditOpen(true);
  };
  const handleEditContact = async () => {
    try {
      const token = Cookies.get("token");
      await axios.put(
        `contacts/${editContact.contact_id}`,
        editContact,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      fetchContacts(); 
      alert("Cập nhật thành công.");// Cập nhật lại danh sách
      setEditOpen(false); // Đóng hộp thoại
    } catch (error) {
      console.error("Error updating contact:", error);
      alert("Cập nhật liên hệ thất bại.");
    }
  };

  const handleDelete = async (contactId) => {
    if (!contactId) {
      alert("Không xác định được liên hệ cần xóa!");
      return;
    }
    if (!window.confirm("Bạn có chắc chắn muốn xóa liên hệ này?")) {
      return;
    }
    const token = Cookies.get('token');    
    try {
      // Gửi yêu cầu xóa liên hệ bằng phương thức DELETE
      await axios.delete(`contacts/${contactId}`, {
        headers: {
          "Content-Type": "application/json", // Đảm bảo định dạng JSON
          "Authorization": `Bearer ${token}`
        },
      });
  
      // Hiển thị thông báo thành công
      alert("Xóa liên hệ thành công!");
  
      // Cập nhật danh sách liên hệ sau khi xóa
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
      if (error.response) {
        alert(`Lỗi: ${error.response.data.message || "Không thể xóa liên hệ!"}`);
      } else {
        alert("Lỗi không xác định khi xóa liên hệ!");
      }
    }
  };


  // Lọc người dùng theo từ khóa tìm kiếm
 const filteredContacts = contacts.filter((contact) => {
  const name = contact.name || ""; // Đặt chuỗi rỗng nếu `name` là undefined
  const email = contact.email || ""; // Đặt chuỗi rỗng nếu `email` là undefined
  const phone = contact.phone || ""; // Đặt chuỗi rỗng nếu `phone` là undefined
  const searchTerm = search || ""; // Đặt chuỗi rỗng nếu `search` là undefined

  return (
    name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    phone.includes(searchTerm)
  );
});

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
        Quản lý Danh bạ
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
          onClick={handleOpen}
        >
          Thêm liên hệ
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
          placeholder="Tìm kiếm người dùng theo tên, email hoặc số điện thoại..."
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

      {/* Bảng danh bạ */}
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
                Email
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                SĐT
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Ngày tạo
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Trạng thái
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Thao tác
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredContacts.map((contact) => (
              <TableRow key={contact.contact_id}>
                <TableCell align="center">{contact.contact_id}</TableCell>
                <TableCell align="center">{contact.name}</TableCell>
                <TableCell align="center">{contact.email}</TableCell>
                <TableCell align="center">{contact.phone}</TableCell>
                <TableCell align="center">{contact.created_at}</TableCell>
                <TableCell align="center">
                  {contact.is_unsubscribed ? "Ngừng đăng ký" : "Đang hoạt động"}
                </TableCell>
                <TableCell align="center"><><EditIcon onClick={() => handleEditClick(contact)} style={{ cursor: 'pointer', marginRight: 8 }}/><DeleteIcon onClick={() => handleDelete(contact.contact_id)} style={{ cursor: 'pointer', marginRight: 8 }} /></></TableCell>
              </TableRow>
            ))}
            {filteredContacts.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ color: "gray" }}>
                  Không tìm thấy kết quả nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog thêm liên hệ */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thêm liên hệ mới</DialogTitle>
        <DialogContent>
          <TextField
            label="Tên"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newContact.name}
            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newContact.email}
            onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
          />
          <TextField
            label="Số điện thoại"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newContact.phone}
            onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleAddContact} color="primary">
            Thêm
          </Button>
        </DialogActions>
          </Dialog>
          <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
      <DialogTitle>Chỉnh sửa liên hệ</DialogTitle>
      <DialogContent>
        <TextField
          label="Tên"
          variant="outlined"
          fullWidth
          margin="normal"
          value={editContact.name}
          onChange={(e) =>
            setEditContact({ ...editContact, name: e.target.value })
          }
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={editContact.email}
          onChange={(e) =>
            setEditContact({ ...editContact, email: e.target.value })
          }
        />
        <TextField
          label="Số điện thoại"
          variant="outlined"
          fullWidth
          margin="normal"
          value={editContact.phone}
          onChange={(e) =>
            setEditContact({ ...editContact, phone: e.target.value })
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setEditOpen(false)} color="secondary">
          Hủy
        </Button>
        <Button onClick={handleEditContact} color="primary">
          Cập nhật
        </Button>
      </DialogActions>
    </Dialog>
    </Box>
  );
};

export default Contact;
