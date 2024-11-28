import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  

} from "@mui/material";
import FlagIcon from '@mui/icons-material/Flag';
import { useNavigate} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import ClearIcon from '@mui/icons-material/Clear';
import axios from "../../axios"; // Import axios
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";


const Campaign = () => {
  const [edited, setEdited] = useState(false);
  const [allContacts, setAllContacts] = useState([]);
  const [groups, setGroups] = useState([]); 
  const [emails, setEmails] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]); // Lưu các nhóm đã chọn
  const { id } = useParams(); // Lấy campaignId từ URL
  const [campaign, setCampaign] = useState([]); 
  const navigate = useNavigate();
  const token = Cookies.get('token');
  useEffect(() => {
    // Hàm chung để gọi API
    
    const fetchData = async (url, setter) => {
      try {
        
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setter(response.data); // Cập nhật dữ liệu từ API
        if(setter === setCampaign) {
          setSelectedGroups(response.data.group_ids.split(',').map(id => parseInt(id, 10)));
        }
        
      } catch (error) {
        console.log(`Lỗi khi gọi API: ${url}`, error);
      }
    };

    if (id) {
      // Gọi API với campaignId từ URL
      fetchData(`/campaigns/get?campaign_id=${id}`, setCampaign); // Lấy chiến dịch
      
      
      
    }
    fetchData("/mail/get", setEmails); // Lấy danh sách email
    fetchData("/groups", setGroups); // Lấy nhóm
    
    

  }, [id]); 
  useEffect(() => {
    if (selectedGroups.length > 0) {  // Kiểm tra nếu có nhóm được chọn
      getContactsForGroups();
    }
  }, [selectedGroups]); 
  const getContactsForGroups = async () => {
    const results = [];  // Mảng để lưu kết quả của từng API call
    try {
      for (const groupId of selectedGroups) {
        // Gọi API cho từng phần tử trong selectedGroups
        const response = await axios.get(`/groups/${groupId}/contacts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Lưu kết quả vào mảng results
        results.push(response.data);  // Giả sử response.data chứa dữ liệu bạn cần
      }
      const mergedContacts = results.reduce((acc, currentArray) => [...acc, ...currentArray], []);
      setAllContacts(mergedContacts);
    } catch (error) {
      console.error("Có lỗi xảy ra khi gọi API:", error);
    }
  };
  
  
  
  
  const handleChange = (selectedValues) => {
    // Đánh dấu là đã chỉnh sửa
    setEdited(true);
    if (!selectedValues || selectedValues.length === 0) {
      setSelectedGroups(["N"]);
      // Thực hiện các hành động khi không có giá trị
    } else {
      
    
      // Kiểm tra kiểu dữ liệu và xử lý tương ứng
      setSelectedGroups(
        Array.isArray(selectedValues) ? selectedValues : selectedValues.split(",") // Nếu là mảng, giữ nguyên; nếu là chuỗi, tách thành mảng
      );
    }
  };
  
  const handleUpdate = async () => {
    var Groups = selectedGroups;
    if (selectedGroups.length === 1 && selectedGroups[0] === "N") {
      Groups = [];
    }
    
    // Tạo dữ liệu sẽ gửi lên API
    const updatedTemplate = {
      "campaign_id": campaign.campaign_id,
      "email_id": campaign?.email_id || "",
      "name": campaign.name  || "Không đặt tên",
      "groups_ids": Groups
  }
  
    try {
      // Gửi yêu cầu PUT để cập nhật thông tin mẫu email
      const response = await axios.put(
        `campaigns/update`,  // Sử dụng emailId trong URL
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
      navigate(0);  
    } catch (error) {
      alert("Có lỗi xảy ra!");
      console.error("Lỗi khi cập nhật:", error);
    }
  };
  const handleStart = async () => {
    
  
    // Tạo dữ liệu sẽ gửi lên API
    const updatedTemplate = {
      "campaign_id": campaign.campaign_id
  }
  
    try {
      // Gửi yêu cầu PUT để cập nhật thông tin mẫu email
      const response = await axios.post(
        `campaigns/start`,  
        updatedTemplate,  // Dữ liệu gửi lên
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",  // Đảm bảo định dạng JSON
          },
        }
      );
  
      // Thông báo thành công
      alert("Thực hiện thành công.");
      navigate("/campaign-management");  
    } catch (error) {
      alert("Có lỗi xảy ra!");
      console.error("Lỗi :", error);
    }
  };
  const handleDelete = async () => {
    // Tạo dữ liệu sẽ gửi lên API
    const updatedTemplate = {
      campaign_id: campaign.campaign_id,
    };
  
    try {
      // Xác nhận yêu cầu xóa
      if (!window.confirm("Bạn có chắc chắn muốn xóa chiến dịch này?")) return;
  
      // Gửi yêu cầu DELETE với body
      const response = await axios.request({
        method: 'DELETE',
        url: 'campaigns/delete',
        data: updatedTemplate,  // Gửi dữ liệu trong body
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      // Thông báo thành công
      alert("Xóa thành công.");
      navigate("/campaign-management");
    } catch (error) {
      alert("Có lỗi xảy ra!");
      console.error("Lỗi:", error);
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
      

      

      {/* Cụm nút */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 1,
          marginBottom: 3,
        }}
      >
        <Typography  sx={{ marginTop: 1,marginRight: 5, color: "#7f8c8d" }}>
          Trạng thái: {campaign.status}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<ArrowBackIcon />}
          sx={{ textTransform: "none", fontWeight: "bold", padding: "6px 16px" }}
          onClick={() => navigate('/campaign-management')}
        >
          Trở về
        </Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<ClearIcon />}
          sx={{ textTransform: "none", fontWeight: "bold", padding: "6px 16px" }}
          onClick={handleDelete}
        >
          Xóa
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          sx={{ textTransform: "none", fontWeight: "bold", padding: "6px 16px" }}
          onClick={handleUpdate}
        >
          Lưu chiến dịch
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<FlagIcon />}
          sx={{ textTransform: "none", fontWeight: "bold", padding: "6px 16px" }}
          onClick={handleStart}
          disabled={edited || !campaign?.email_id || selectedGroups.length === 0}
        >
          Bắt đầu chiến dịch
        </Button>
        
      </Box>
      {/* Tiêu đề */}
      <Typography
        variant="h6"
        sx={{
          marginBottom: 3,
          fontWeight: "bold",
          color: "#2c3e50",
        }}
      >
        Chi tiết chiến dịch
      </Typography>

      <Box
        sx={{
          marginBottom: 3,
          padding: 2,
          border: "1px solid #ddd", // Thêm border cho box
        }}
      >
        <Typography variant="subtitle1" sx={{  color: "#2c3e50" }}>
          Tổng quan
        </Typography>
        <TextField
          label="Tên chiến dịch"
          variant="outlined"
          fullWidth
          sx={{ marginTop: 3 }}
          value={campaign.name  || ""}
          onChange={(e) => {
            setCampaign(prevCampaign => ({ ...prevCampaign, name: e.target.value }));
            setEdited(true);
          }}
          
        />
        
        <FormControl fullWidth sx={{ marginTop: 3 }}>
          <InputLabel>Mẫu Email</InputLabel>
          <Select
            value={campaign?.email_id || ""}
            onChange={(e) => {
              setCampaign(prevCampaign => ({ ...prevCampaign, email_id: e.target.value }));
              setEdited(true);
            }}
            input={<OutlinedInput label="Mẫu Email" />}
          >
            {emails.map((email) => (
              <MenuItem
                key={email.email_id}
                value={email.email_id}
              >
                {email.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
      </Box>

      <Box
        sx={{
          marginBottom: 3,
          padding: 2,
          border: "1px solid #ddd", // Thêm border cho box
        }}
      >
        <Typography variant="subtitle1" sx={{  color: "#2c3e50" }}>
          Danh sách người nhận
        </Typography>
        <FormControl fullWidth sx={{ marginTop: 3 }}>
          <InputLabel>Nhóm</InputLabel>
          <Select
            multiple
            value={selectedGroups}
            onChange={(e) => {
              const selectedValues = e.target.value;
              handleChange(selectedValues);  // Gọi hàm handleChange với giá trị được chọn
            }}
            input={<OutlinedInput label="Name" />}
          >
            {groups.map((group) => (
              <MenuItem
                key={group.group_id}
                value={group.group_id}
              >
                {group.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Tên
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Địa chỉ mail
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                SĐT
              </TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
          {allContacts.map((contact, index) => (
            <TableRow key={index}>
              <TableCell align="left">{contact.name}</TableCell>
              <TableCell align="left">{contact.email}</TableCell>
              <TableCell align="left">{contact.phone}</TableCell>
            </TableRow>
          ))}
          </TableBody>

        </Table>
      </TableContainer>
        
      </Box>

      
      
    </Box>
  );
};

export default Campaign;
