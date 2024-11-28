import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from '@mui/material';
import axiosInstance from '../../axios';
import Cookies from 'js-cookie';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', user_type: 'user' });
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editUser, setEditUser] = useState({ id: '', name: '', email: '', user_type: '' });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const fetchUsers = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axiosInstance.get('/users/getUsers', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const formattedUsers = response.data.data.map(user => ({
        id: user.user_id,
        name: user.name,
        email: user.email,
        user_type: user.user_type,
        createdAt: new Date(user.created_at).toLocaleString(),
      }));

      setUsers(formattedUsers);
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewUser(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditInputChange = e => {
    const { name, value } = e.target;
    setEditUser(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleAddUser = async () => {
    const { name, email, password, user_type } = newUser;
    const token = Cookies.get('token'); // Lấy token từ Cookies
  
    if (name && email && password) {
      try {
        await axiosInstance.post(
          '/users/add',
          { name, email, password, user_type },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Truyền token vào header
            },
          }
        );
        fetchUsers(); // Làm mới danh sách người dùng
        setOpenDialog(false);
        handleSnackbarOpen('Thêm người dùng thành công!', 'success');
      } catch (err) {
        console.error('Lỗi khi thêm người dùng:', err);
  
        if (err.response && err.response.status === 401) {
          handleSnackbarOpen('Bạn không có quyền thực hiện thao tác này.', 'error');
        } else {
          handleSnackbarOpen('Lỗi khi thêm người dùng.', 'error');
        }
      }
    } else {
      handleSnackbarOpen('Vui lòng nhập đầy đủ thông tin.', 'warning');
    }
  };
  

  const handleEditUser = user => {
    setEditUser(user);
    setEditDialogOpen(true);
  };

  const handleUpdateUser = async () => {
    const { id, name, email, user_type } = editUser;
    const token = Cookies.get('token'); // Lấy token từ Cookies
  
    if (name && email && user_type) {
      try {
        await axiosInstance.put(
          `/users/update/${id}`,
          { name, email, user_type },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Truyền token vào header
            },
          }
        );
        fetchUsers(); // Làm mới danh sách người dùng
        setEditDialogOpen(false);
        handleSnackbarOpen('Cập nhật người dùng thành công!', 'success');
      } catch (err) {
        console.error('Lỗi khi cập nhật người dùng:', err);
  
        if (err.response && err.response.status === 401) {
          handleSnackbarOpen('Bạn không có quyền thực hiện thao tác này.', 'error');
        } else {
          handleSnackbarOpen('Lỗi khi cập nhật người dùng.', 'error');
        }
      }
    } else {
      handleSnackbarOpen('Dữ liệu nhập không hợp lệ.', 'warning');
    }
  };
  
  const handleDeleteUser = async (id) => { if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) { try { const token = Cookies.get('token'); await axiosInstance.delete(`/users/delete/${id}`, { headers: { Authorization: `Bearer ${token}`, }, }); setUsers(users.filter((user) => user.id !== id)); handleSnackbarOpen('Xóa người dùng thành công!', 'success'); } catch (err) { console.error('Lỗi khi xóa người dùng:', err); if (err.response && err.response.status === 401) { handleSnackbarOpen('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.', 'error'); } else { handleSnackbarOpen('Lỗi khi xóa người dùng.', 'error'); } } } };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Quản lý người dùng
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => setOpenDialog(true)}
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
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.user_type === 'admin' ? 'Quản trị' : 'Người dùng'}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ mr: 1 }}
                  onClick={() => handleEditUser(user)}
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
            name="name"
            value={newUser.name}
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
            <Select name="user_type" value={newUser.user_type} onChange={handleInputChange}>
              <MenuItem value="regular">Người dùng</MenuItem>
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

      {/* Dialog chỉnh sửa người dùng */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Chỉnh sửa thông tin người dùng</DialogTitle>
        <DialogContent>
          <TextField
            label="Tên người dùng"
            variant="outlined"
            fullWidth
            margin="normal"
            name="name"
            value={editUser.name}
            onChange={handleEditInputChange}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={editUser.email}
            onChange={handleEditInputChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Vai trò</InputLabel>
            <Select name="user_type" value={editUser.user_type} onChange={handleEditInputChange}>
              <MenuItem value="user">Người dùng</MenuItem>
              <MenuItem value="admin">Quản trị</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleUpdateUser} color="primary">
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserManagement;

