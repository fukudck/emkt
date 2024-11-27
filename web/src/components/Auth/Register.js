import React, { useState } from "react";
import axios from "../../axios";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !email || !password) {
      setError("Vui lòng điền đủ các thông tin");
      return;
    }
    const postData = JSON.stringify({
      name: `${username}`,
      email: `${email}`,
      password: `${password}`
    });

    try {
      await axios.post("/auth/register", postData, {
        headers: {
          'Content-Type': 'application/json', // Định rõ kiểu dữ liệu gửi đi
        }
      });
      alert("Đăng ký thành công");
      navigate("/login"); // Chuyển hướng đến trang đăng nhập sau khi đăng ký
    } catch (err) {
      setError("Có lỗi xảy ra");
    }
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
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          marginBottom: 3,
          fontWeight: "bold",
          color: "#2c3e50",
        }}
      >
        Đăng Ký
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Tên người dùng"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputLabelProps={{ shrink: true }} // Sửa lỗi placeholder chồng chéo
          sx={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{ shrink: true }} // Sửa lỗi placeholder chồng chéo
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
          InputLabelProps={{ shrink: true }} // Sửa lỗi placeholder chồng chéo
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
          Đăng Ký
        </Button>
        {error && (
          <Typography color="error" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}
      </form>

      {/* Hình ảnh phía dưới */}
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="https://img.freepik.com/free-vector/secure-login-concept-illustration_114360-4582.jpg"
          alt="Secure Login"
          style={{
            width: "100%",
            maxWidth: "350px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        />
      </Box>
    </Box>
  );
};

export default Register;
