
import React, { useState, useEffect } from "react";
import axios from "../../axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  Avatar,
  IconButton,
  Alert,
  Snackbar,
  SnackbarContent,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import GroupIcon from "@mui/icons-material/Group";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import Cookies from "js-cookie";

const Group = () => {
  const [groups, setGroups] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [groupContacts, setGroupContacts] = useState([]);
  const [openAddGroup, setOpenAddGroup] = useState(false);
  const [openManageContacts, setOpenManageContacts] = useState(false);
  const [openEditGroup, setOpenEditGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [editGroupName, setEditGroupName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success'); 
  const [alert, setAlert] = useState(null);
  const API_BASE_URL = ""; // Điền URL API

  // Fetch groups and contacts on component load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const [groupRes, contactRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/groups`, { headers }),
          axios.get(`${API_BASE_URL}/contacts`, { headers }),
        ]);
        setGroups(groupRes.data);
        setContacts(contactRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleOpenAddGroup = () => setOpenAddGroup(true);
  const handleCloseAddGroup = () => setOpenAddGroup(false);

  const handleOpenEditGroup = (group) => {
    setSelectedGroup(group);
    setEditGroupName(group.name);
    setOpenEditGroup(true);
  };
  const handleCloseEditGroup = () => setOpenEditGroup(false);

  const handleOpenManageContacts = async (group) => {
    setSelectedGroup(group);
    try {
      const token = Cookies.get("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const { data } = await axios.get(
        `${API_BASE_URL}/groups/${group.group_id}/contacts`,
        { headers }
      );
      setSelectedContacts(data.map((contact) => contact.contact_id));
    } catch (error) {
      console.error("Error fetching group contacts:", error);
    }
    setOpenManageContacts(true);
  };

  const handleCloseManageContacts = () => setOpenManageContacts(false);

  const handleAddGroup = async () => {
    if (!newGroupName) return;
    try {
      const token = Cookies.get("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const { data } = await axios.post(
        `${API_BASE_URL}/groups`,
        { name: newGroupName },
        { headers }
      );
      setGroups((prev) => [
        ...prev,
        {
          group_id: data.groupId,
          name: newGroupName,
          created_at: new Date().toISOString().split("T")[0],
        },
      ]);
      setNewGroupName("");
      setOpenAddGroup(false);
      setAlert({ message: "Thêm nhóm thành công!", severity: "success" });
      setTimeout(() => setAlert(null), 2000); // Hide alert after 3 seconds
    } catch (error) {
      console.error("Error adding group:", error);
      setAlert({ message: "Có lỗi xảy ra khi thêm nhóm.", severity: "error" });
      setTimeout(() => setAlert(null), 2000); // Hide alert after 3 seconds
    }
  };

  const handleEditGroup = async () => {
    if (!editGroupName || !selectedGroup) return;
    try {
      const token = Cookies.get("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      await axios.put(
        `${API_BASE_URL}/groups/${selectedGroup.group_id}`,
        { name: editGroupName },
        { headers }
      );
      setGroups((prev) =>
        prev.map((group) =>
          group.group_id === selectedGroup.group_id
            ? { ...group, name: editGroupName }
            : group
        )
      );
      setOpenEditGroup(false);
      setAlert({ message: "Sửa nhóm thành công.", severity: "success" });
      setTimeout(() => setAlert(null), 2000); 
    } catch (error) {
      console.error("Error editing group:", error);
      setAlert({ message: "Có lỗi xảy ra khi cập nhật nhóm.", severity: "error" });
      setTimeout(() => setAlert(null), 2000); 
    }
  };

  const handleDeleteGroup = async (groupId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa nhóm này?")) return;
    try {
      const token = Cookies.get("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      await axios.delete(`${API_BASE_URL}/groups/${groupId}`, { headers });
      setGroups((prev) => prev.filter((group) => group.group_id !== groupId));
      setAlert({ message: "Xóa nhóm thành công!", severity: "success" });
      setTimeout(() => setAlert(null), 1500); // Hide alert after 3 seconds
    } catch (error) {
      console.error("Error deleting group:", error);
      setAlert({ message: "Có lỗi xảy ra khi xóa nhóm.", severity: "error" });
      setTimeout(() => setAlert(null), 1500); // Hide alert after 3 seconds
    }
  };
  // const handleSaveContactsToGroup = async () => {
  //   if (selectedContacts.length === 0) {
  //     console.error("No contacts selected.");
  //     return;
  //   }
  
  //   try {
  //     const token = Cookies.get("token");
  //     const headers = {
  //       "Content-Type": "application/json",
  //       "Authorization": `Bearer ${token}`,
  //     };
  
  //     for (const contactId of selectedContacts) {
  //       await axios.post(
  //         `${API_BASE_URL}/groups/${selectedGroup.group_id}/contacts`,
  //         { contactId },
  //         { headers }
  //       );
  //     }
  
  //     // Cập nhật danh sách liên hệ trong nhóm sau khi hoàn thành
  //     setGroupContacts((prev) =>
  //       prev
  //         .filter((gc) => gc.group_id !== selectedGroup.group_id)
  //         .concat(
  //           selectedContacts.map((contact_id) => ({
  //             group_id: selectedGroup.group_id,
  //             contact_id,
  //           }))
  //         )
  //     );

  //     setOpenManageContacts(false);
  //     setAlert({ message: "Thêm danh bạ vào nhóm thành công.", severity: "success" });
  //     setTimeout(() => setAlert(null), 1500);
  //   } catch (error) {
  //     console.error("Error saving contacts to group:", error);
  //   }
  // };
  
  const toggleContactSelection = (contact_id) => {
    setSelectedContacts((prev) =>
      prev.includes(contact_id)
        ? prev.filter((id) => id !== contact_id)
        : [...prev, contact_id]
    );
  };

  const handleSaveContactsToGroup = async () => {
    if (selectedContacts.length === 0) {
      console.error("No contacts selected.");
      return;
    }
  
    try {
      const token = Cookies.get("token");
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };
  
      let alreadyExistsContacts = [];
      let addedContacts = [];
  
      for (const contactId of selectedContacts) {
        const response = await axios.post(
          `${API_BASE_URL}/groups/${selectedGroup.group_id}/contacts`,
          { contactId },
          { headers }
        );
  
        if (response.status === 200 && response.data.message.includes("Liên hệ đã tồn tại")) {
          alreadyExistsContacts.push(contactId);
        } else if (response.status === 201) {
          addedContacts.push(contactId);
        }
      }
  
      // Cập nhật danh sách liên hệ trong nhóm
      setGroupContacts((prev) =>
        prev
          .filter((gc) => gc.group_id !== selectedGroup.group_id)
          .concat(
            addedContacts.map((contact_id) => ({
              group_id: selectedGroup.group_id,
              contact_id,
            }))
          )
      );
  
      setOpenManageContacts(false);
  
      // Hiển thị thông báo thành công hoặc thông báo liên hệ đã tồn tại
      if (addedContacts.length > 0) {
        setAlert({ message: "Thêm danh bạ vào nhóm thành công.", severity: "success" });
      }
      if (alreadyExistsContacts.length > 0) {
        setAlert({
          message: `Một số liên hệ đã tồn tại trong nhóm: ${alreadyExistsContacts.join(", ")}`,
          severity: "info",
        });
      }
  
      setTimeout(() => setAlert(null), 1500);
    } catch (error) {
      console.error("Error saving contacts to group:", error);
      setAlert({ message: "Lỗi khi thêm liên hệ vào nhóm.", severity: "error" });
    }
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ padding: 3 }}>
      {alert && (
        <Alert variant="filled" severity={alert.severity} sx={{ marginBottom: 2 }}>
          {alert.message}
        </Alert>
      )}
      <Typography variant="h4" gutterBottom>
        <GroupIcon sx={{ marginRight: 1, verticalAlign: "middle" }} />
        Quản lý Nhóm
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleOpenAddGroup}
      >
        Thêm Nhóm
      </Button>
      <List>
        {groups.map((group) => (
          <ListItem
            key={group.group_id}
            sx={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              marginBottom: "8px",
            }}
          >
            <Avatar
              sx={{
                bgcolor: "#1976d2",
                marginRight: 2,
              }}
            >
              {group.name[0]}
            </Avatar>
            <ListItemText
              primary={group.name}
              secondary={`Ngày tạo: ${group.created_at}`}
            />
            <IconButton
              color="primary"
              onClick={() => handleOpenEditGroup(group)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => handleDeleteGroup(group.group_id)}
            >
              <DeleteIcon />
            </IconButton>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleOpenManageContacts(group)}
            >
              Quản lý liên hệ
            </Button>
          </ListItem>
        ))}
      </List>


      {/* Dialog thêm nhóm */}
      <Dialog open={openAddGroup} onClose={handleCloseAddGroup}>
        <DialogTitle>Thêm Nhóm Mới</DialogTitle>
        <DialogContent>
          <TextField
            label="Tên nhóm"
            variant="outlined"
            fullWidth
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddGroup} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleAddGroup} color="primary">
            Thêm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog sửa nhóm */}
      <Dialog open={openEditGroup} onClose={handleCloseEditGroup}>
        <DialogTitle>Sửa Nhóm</DialogTitle>
        <DialogContent>
          <TextField
            label="Tên nhóm"
            variant="outlined"
            fullWidth
            value={editGroupName}
            onChange={(e) => setEditGroupName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditGroup} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleEditGroup} color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog quản lý liên hệ */}
      <Dialog open={openManageContacts} onClose={handleCloseManageContacts}>
        <DialogTitle>Quản lý Liên hệ</DialogTitle>
        <DialogContent>
          <TextField
            label="Tìm kiếm liên hệ"
            variant="outlined"
            fullWidth
            margin="dense"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ marginRight: 1 }} />,
            }}
          />
          <List>
            {filteredContacts.map((contact) => (
              <ListItem
                key={contact.contact_id}
                button
                onClick={() => toggleContactSelection(contact.contact_id)}
              >
                <Checkbox
                  checked={selectedContacts.includes(contact.contact_id)}
                />
                <ListItemText primary={contact.name} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseManageContacts} color="secondary">
            Đóng
          </Button>
          <Button onClick={handleSaveContactsToGroup} color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Group;
