import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { Editor } from "@tinymce/tinymce-react";
import axios from "../../axios"; // Import axios
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
const token = Cookies.get('token');



const EmailTemplate = () => {
  const [templateName, setTemplateName] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { isEdit, email_id } = location.state || {};
  useEffect(() => {
    if(email_id) {
      updateForm();
    }
  }, []);
  const updateForm = async () => {
    try {
      const response = await axios.get(
        `/mail/get?email_id=${email_id}`,  // Thay 6 bằng biến emailId
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      setTemplateName(response.data.name);
      setSubject(response.data.subject);
      setBody(response.data.content);
      
    } catch {
      alert("Có lỗi xảy ra!");
    }
  }


  const handleSave = async () => {
    if (!templateName || !subject || !body) {
      alert("Vui lòng điền đủ thông tin!");
      return;
    }
    const newTemplate = JSON.stringify({
      name: templateName,
      subject: subject,
      content: body
    });
    

    try {
      const response = await axios.post(
        "mail/add",
        newTemplate, // Dữ liệu gửi lên
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json", // Đảm bảo định dạng JSON
          },
        }
      );
      alert("Thêm thành công.");
      navigate("/email-template")
    } catch {
      alert("Có lỗi xảy ra!");
    }
    
  };
  const handleUpdate = async (emailId) => {
    // Kiểm tra dữ liệu đầu vào
    if (!templateName || !subject || !body) {
      alert("Vui lòng điền đủ thông tin!");
      return;
    }
  
    // Tạo dữ liệu sẽ gửi lên API
    const updatedTemplate = {
      name: templateName,
      subject: subject,
      content: body,
    };
  
    try {
      // Gửi yêu cầu PUT để cập nhật thông tin mẫu email
      const response = await axios.put(
        `mail/update/${emailId}`,  // Sử dụng emailId trong URL
        updatedTemplate,  // Dữ liệu gửi lên
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",  // Đảm bảo định dạng JSON
          },
        }
      );
  
      // Thông báo thành công
      alert("Cập nhật thành công.");
      navigate("/email-template");  // Chuyển hướng tới trang danh sách email templates
    } catch (error) {
      alert("Có lỗi xảy ra!");
      console.error("Lỗi khi cập nhật:", error);
    }
  };
  const handleClick = () => {
    // Kiểm tra nếu có isEdit thì gọi handleUpdate, nếu không gọi handleSave
    if (isEdit) {
      handleUpdate(email_id);  // Gọi handleUpdate nếu đang trong chế độ sửa
    } else {
      handleSave();  // Gọi handleSave nếu không phải sửa
    }
  };
  
  


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
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#2c3e50",
          textAlign: "center",
          marginBottom: 3,
        }}
      >
        
        {isEdit ? `Sửa Mẫu Email` : `Tạo Mẫu Email`}
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
        <Button
          onClick={() => navigate('/email-template')}
          variant="contained"
          color="secondary"
          startIcon={<ArrowBackIcon />}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Trở về
        </Button>
        <Box sx={{ display: "flex", gap: 1 }}>
          
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
            }}
            onClick={handleClick}
          >
            {isEdit ? "Cập nhật" : "Lưu"} 
          </Button>
          
        </Box>
      </Box>

      <TextField
        fullWidth
        label="Tên mẫu"
        variant="outlined"
        value={templateName}
        onChange={(e) => setTemplateName(e.target.value)}
        sx={{ marginBottom: 3 }}
        
      />
      <TextField
        fullWidth
        label="Chủ đề"
        variant="outlined"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        sx={{ marginBottom: 3 }}
      />

      <Typography variant="h6" sx={{ marginBottom: 1 }}>
        Nội dung email:
      </Typography>
      <Editor
        apiKey="s5h79zkbtal69nxsrnvklqzia91f3g6dvy45zc2kjlny2wma"
        value={body}
        onEditorChange={(content) => setBody(content)}
        init={{
          height: 300,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help",
        }}
      />
    </Box>
  );
};

export default EmailTemplate;
