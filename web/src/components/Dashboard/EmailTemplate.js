import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Editor } from "@tinymce/tinymce-react";

const EmailTemplate = () => {
  const [templateName, setTemplateName] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSave = () => {
    if (!templateName || !subject || !body) {
      alert("Vui lòng điền đủ thông tin!");
      return;
    }
    const newTemplate = {
      templateName,
      subject,
      body,
    };
    console.log("Template saved:", newTemplate);
    alert("Mẫu email đã được lưu thành công!");
  };
	//const handleSave = async () => {
  /*if (!templateName || !subject || !body) {
    alert("Vui lòng điền đủ thông tin!");
    return;
  }

  try {
    const response = await axios.post("/api/email-templates", {
      templateName,
      subject,
      body,
    });
    alert("Mẫu email đã được lưu thành công!");
    console.log("Response:", response.data);
  } catch (error) {
    console.error("Lỗi khi lưu mẫu:", error);
    alert("Đã xảy ra lỗi khi lưu mẫu!");
  }
};
*/

  const handleAddNew = () => {
    setTemplateName("");
    setSubject("");
    setBody("");
  };

  return (
    <Box
      sx={{
        maxWidth: "800px",
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
        Tạo Mẫu Email
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
        <Button
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
            color="success"
            startIcon={<AddIcon />}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
            }}
            onClick={handleAddNew}
          >
            Thêm mới
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
            }}
            onClick={handleSave}
          >
            Lưu
          </Button>
          <IconButton
            color="error"
            sx={{
              backgroundColor: "#ffebee",
              "&:hover": { backgroundColor: "#ffcdd2" },
            }}
          >
            <CloseIcon />
          </IconButton>
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
