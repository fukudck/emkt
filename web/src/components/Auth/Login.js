import React, { useState } from "react";
import axios from "../../axios";
import Cookies from "js-cookie";
import { TextField, Button, Typography, Box, Snackbar, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Vui lòng điền đủ email và mật khẩu");
      setOpenError(true);
      return;
    }
    const postData = JSON.stringify({
      email: `${email}`,
      password: `${password}`
    });


    try {
      const response = await axios.post("/auth/login", postData, {
        headers: {
          'Content-Type': 'application/json', // Định rõ kiểu dữ liệu gửi đi
        }
      });
      
      
      // Lưu token vào Cookie với thời hạn 1 giờ
      Cookies.set("token", response.data.token, { expires: 1 / 24 }); // expires: 1 giờ

      setSuccessMessage("Đăng nhập thành công!");
      setOpenSuccess(true);

      // Điều hướng đến trang chủ sau 2 giây
      setTimeout(() => navigate("/home"), 2000);
    } catch (err) {
      setError("Email hoặc mật khẩu không đúng");
      setOpenError(true);
    }
  };

  const handleCloseError = () => {
    setOpenError(false);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "0 auto",
        padding: 3,
        border: "1px solid #ddd",
        borderRadius: "12px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ marginBottom: 3, fontWeight: "bold", color: "#2c3e50" }}>
        Đăng Nhập
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}
        />
        <TextField
          label="Mật khẩu"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            marginTop: 2,
            padding: 1.5,
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "8px",
          }}
        >
          Đăng Nhập
        </Button>
      </form>
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg"
          alt="Access control"
          style={{
            width: "100%",
            maxWidth: "350px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        />
      </Box>

      {/* Liên kết tới trang đăng ký */}
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="body2" color="textSecondary">
          Chưa có tài khoản?{" "}
          <Link
            href="/register"
            sx={{ cursor: "pointer", color: "#1976d2" }}
          >
            Đăng ký ngay
          </Link>
        </Typography>
      </Box>
      
      {/* Snackbar thông báo lỗi */}
      <Snackbar open={openError} autoHideDuration={4000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>

      {/* Snackbar thông báo thành công */}
      <Snackbar open={openSuccess} autoHideDuration={2000} onClose={handleCloseSuccess}>
        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: "100%" }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
