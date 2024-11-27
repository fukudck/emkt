import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, FormControl, InputLabel, Snackbar, Alert } from '@mui/material';
import axiosInstance from '../../axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]); // State lưu trữ danh sách người dùng
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Lỗi khi gọi API
  const [openDialog, setOpenDialog] = useState(false); // Trạng thái mở đóng Dialog
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '', role: 'user' }); // State chứa dữ liệu người dùng mới
  const [openSnackbar, setOpenSnackbar] = useState(false); // Trạng thái mở Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Nội dung thông báo
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Loại thông báo (success/error)

  // Hàm lấy danh sách người dùng từ API
  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/users/getUsers');
      setUsers(response.data.data);
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Gọi fetchUsers khi component được mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Xử lý thay đổi giá trị trong form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Mở thông báo Snackbar
  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  // Đóng Snackbar
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  // Xử lý thêm người dùng
  const handleAddUser = async () => {
    const { username, email, password, role } = newUser;
    
    if (username && email && password) {
      try {
        await axiosInstance.post('/users/add', { username, email, password, role });
        fetchUsers(); // Cập nhật danh sách người dùng sau khi thêm
        setOpenDialog(false); // Đóng dialog sau khi thêm người dùng
        handleSnackbarOpen('Thêm người dùng thành công!', 'success');
      } catch (err) {
        console.error('Lỗi khi thêm người dùng:', err);
        handleSnackbarOpen('Lỗi khi thêm người dùng.', 'error');
      }
    } else {
      handleSnackbarOpen('Vui lòng nhập đầy đủ thông tin.', 'warning');
    }
  };

  // Xử lý sửa người dùng
  const handleEditUser = async (id) => {
    const username = prompt('Nhập tên người dùng mới:');
    const email = prompt('Nhập email mới:');
    const role = prompt('Nhập vai trò (admin/user):');
  
    if (username && email && role) {
      try {
        await axiosInstance.put(`/users/update/${id}`, { username, email, role });
        setUsers(
          users.map((user) =>
            user.id === id ? { ...user, username, email, role } : user
          )
        );
        handleSnackbarOpen('Cập nhật người dùng thành công!', 'success');
      } catch (err) {
        console.error('Lỗi khi cập nhật người dùng:', err);
        handleSnackbarOpen('Lỗi khi cập nhật người dùng.', 'error');
      }
    } else {
      handleSnackbarOpen('Dữ liệu nhập không hợp lệ.', 'warning');
    }
  };

  // Xử lý xóa người dùng
  const handleDeleteUser = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      try {
        await axiosInstance.delete(`/users/delete/${id}`);
        setUsers(users.filter((user) => user.id !== id));
        handleSnackbarOpen('Xóa người dùng thành công!', 'success');
      } catch (err) {
        console.error('Lỗi khi xóa người dùng:', err);
        handleSnackbarOpen('Lỗi khi xóa người dùng.', 'error');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>Quản lý người dùng</Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => setOpenDialog(true)} // Mở Dialog
      >
        Thêm người dùng mới
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tên người dùng</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Vai trò</TableCell>
            <TableCell>Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role === 'admin' ? 'Quản trị' : 'Người dùng'}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ mr: 1 }}
                  onClick={() => handleEditUser(user.id)}
                >
                  Sửa
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Xóa
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialog thêm người dùng */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Thêm người dùng mới</DialogTitle>
        <DialogContent>
          <TextField
            label="Tên người dùng"
            variant="outlined"
            fullWidth
            margin="normal"
            name="username"
            value={newUser.username}
            onChange={handleInputChange}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            type="email"
            value={newUser.email}
            onChange={handleInputChange}
          />
          <TextField
            label="Mật khẩu"
            variant="outlined"
            fullWidth
            margin="normal"
            name="password"
            type="password"
            value={newUser.password}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Vai trò</InputLabel>
            <Select
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
            >
              <MenuItem value="user">Người dùng</MenuItem>
              <MenuItem value="admin">Quản trị</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleAddUser} color="primary">
            Thêm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar thông báo */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserManagement;
