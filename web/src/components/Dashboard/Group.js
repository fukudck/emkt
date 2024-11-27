import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import GroupIcon from "@mui/icons-material/Group";

const Group = () => {
  const [groups, setGroups] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [groupContacts, setGroupContacts] = useState([]);
  const [openAddGroup, setOpenAddGroup] = useState(false);
  const [openManageContacts, setOpenManageContacts] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedContacts, setSelectedContacts] = useState([]);

  // Fetch data giả lập
  useEffect(() => {
    // Giả lập API trả về dữ liệu nhóm và liên hệ
    const fetchData = async () => {
      const fakeGroups = [
        { group_id: 1, name: "Nhóm 1", created_at: "2024-11-01" },
        { group_id: 2, name: "Nhóm 2", created_at: "2024-11-10" },
      ];
      const fakeContacts = [
        {
          contact_id: 1,
          name: "Nguyễn Văn A",
          email: "a@example.com",
          avatar: "https://via.placeholder.com/50",
        },
        {
          contact_id: 2,
          name: "Trần Thị B",
          email: "b@example.com",
          avatar: "https://via.placeholder.com/50",
        },
      ];
      const fakeGroupContacts = [{ group_id: 1, contact_id: 1 }];

      setGroups(fakeGroups);
      setContacts(fakeContacts);
      setGroupContacts(fakeGroupContacts);
    };

    fetchData();
  }, []);

  const handleOpenAddGroup = () => setOpenAddGroup(true);
  const handleCloseAddGroup = () => setOpenAddGroup(false);
  const handleOpenManageContacts = (group) => {
    setSelectedGroup(group);
    const groupContactIds = groupContacts
      .filter((gc) => gc.group_id === group.group_id)
      .map((gc) => gc.contact_id);
    setSelectedContacts(groupContactIds);
    setOpenManageContacts(true);
  };
  const handleCloseManageContacts = () => setOpenManageContacts(false);

  const handleAddGroup = () => {
    if (!newGroupName) return;
    const newGroup = {
      group_id: groups.length + 1,
      name: newGroupName,
      created_at: new Date().toISOString().split("T")[0],
    };
    setGroups([...groups, newGroup]);
    setNewGroupName("");
    setOpenAddGroup(false);
  };

  const handleSaveContactsToGroup = () => {
    const updatedGroupContacts = [
      ...groupContacts.filter((gc) => gc.group_id !== selectedGroup.group_id),
      ...selectedContacts.map((contact_id) => ({
        group_id: selectedGroup.group_id,
        contact_id,
      })),
    ];
    setGroupContacts(updatedGroupContacts);
    setOpenManageContacts(false);
  };

  const toggleContactSelection = (contact_id) => {
    setSelectedContacts((prev) =>
      prev.includes(contact_id)
        ? prev.filter((id) => id !== contact_id)
        : [...prev, contact_id]
    );
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        <GroupIcon sx={{ marginRight: 1, verticalAlign: "middle" }} />
        Quản lý Nhóm
      </Typography>
      {/* Danh sách nhóm */}
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

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleOpenAddGroup}
      >
        Thêm Nhóm
      </Button>

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

      <Dialog open={openManageContacts} onClose={handleCloseManageContacts}>
        <DialogTitle>Quản lý liên hệ trong nhóm "{selectedGroup?.name}"</DialogTitle>
        <DialogContent>
          <List>
            {contacts.map((contact) => (
              <ListItem key={contact.contact_id}>
                <Checkbox
                  checked={selectedContacts.includes(contact.contact_id)}
                  onChange={() => toggleContactSelection(contact.contact_id)}
                />
                <Avatar src={contact.avatar} sx={{ marginRight: 2 }} />
                <ListItemText
                  primary={contact.name}
                  secondary={contact.email}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseManageContacts} color="secondary">
            Hủy
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
