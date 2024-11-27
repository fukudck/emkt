import React from "react";
import { Box, Typography, Paper, Grid2 } from "@mui/material";

const HomePage = () => {
  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          marginBottom: 4,
          fontWeight: "bold",
          color: "#2c3e50",
          textAlign: "center",
        }}
      >
        Chào mừng đến với Dashboard Email Marketing
      </Typography>

      {/* Grid cho các thẻ Paper */}
      <Grid2 container spacing={3} justifyContent="center" sx={{ maxWidth: "1200px" }}>
        <Grid2 item xs={12} sm={6} md={4}>
          <Paper
            elevation={5}
            sx={{
              padding: 3,
              backgroundColor: "#ffffff",
              textAlign: "center",
              borderRadius: "12px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <Typography variant="h6" color="#34495e">
              Quản lý người dùng
            </Typography>
          </Paper>
        </Grid2>
        <Grid2 item xs={12} sm={6} md={4}>
          <Paper
            elevation={5}
            sx={{
              padding: 3,
              backgroundColor: "#ffffff",
              textAlign: "center",
              borderRadius: "12px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <Typography variant="h6" color="#34495e">
              Quản lý chiến dịch
            </Typography>
          </Paper>
        </Grid2>
        <Grid2 item xs={12} sm={6} md={4}>
          <Paper
            elevation={5}
            sx={{
              padding: 3,
              backgroundColor: "#ffffff",
              textAlign: "center",
              borderRadius: "12px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <Typography variant="h6" color="#34495e">
              Gửi email marketing
            </Typography>
          </Paper>
        </Grid2>
      </Grid2>

      {/* Grid cho ảnh */}
      <Grid2 container justifyContent="center" sx={{ marginTop: 5 }}>
        <Grid2 item xs={12} md={8}>
          <Box
            component="img"
            src="https://getflycrm.com/wp-content/uploads/2023/09/quan-ly-chien-dich-email-marketing.webp"
            alt="Email Marketing"
            sx={{
              width: "100%",
              borderRadius: "12px",
              boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
            }}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default HomePage;
