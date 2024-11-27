import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, TextField, Avatar, Box } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const navigate = useNavigate();
  const isAuthenticated = Cookies.get("token"); // Kiểm tra trạng thái đăng nhập

  // Lấy tên người dùng từ localStorage
  const username = Cookies.get("email");

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    navigate("/login");
    handleClose();
  };

  const handleRegister = () => {
    navigate("/register");
    handleClose();
  };

  const handleLogout = () => {
    Cookies.remove("token"); // Xóa token khi đăng xuất
    Cookies.remove("email"); // Xóa tên người dùng khi đăng xuất
    navigate("/"); // Điều hướng về trang chủ sau khi đăng xuất
    handleClose();
  };

  const handleSearch = (event) => {
    event.preventDefault();
    // Xử lý tìm kiếm ở đây
    console.log("Tìm kiếm:", searchTerm);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#ffffff', boxShadow: 'none' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#4285f4', fontWeight: 'bold' }}>
          Ứng Dụng Của Tôi
        </Typography>
        <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ borderRadius: '20px', backgroundColor: '#f1f1f1' }}
          />
          <IconButton type="submit" sx={{ padding: '10px' }}>
            <SearchIcon sx={{ color: '#4285f4' }} />
          </IconButton>
        </form>
        <div>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            onClick={handleMenu}
            aria-controls="menu-appbar"
            aria-haspopup="true"
          >
            {isAuthenticated ? (
              // Hiển thị avatar và tên người dùng
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar sx={{ marginRight: 1 }}>
                  {username ? username[0].toUpperCase() : "U"}
                </Avatar>
                <Typography variant="body1" sx={{ color: '#4285f4' }}>
                  {username}
                </Typography>
              </Box>
            ) : (
              <AccountCircle sx={{ color: '#4285f4' }} />
            )}
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {isAuthenticated ? (
              [
                <MenuItem key="logout" onClick={handleLogout}>Đăng Xuất</MenuItem>,
                // Thêm các mục menu khác khi đã đăng nhập
              ]
            ) : (
              [
                <MenuItem key="login" onClick={handleLogin}>Đăng Nhập</MenuItem>,
                <MenuItem key="register" onClick={handleRegister}>Đăng Ký</MenuItem>,
              ]
            )}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;