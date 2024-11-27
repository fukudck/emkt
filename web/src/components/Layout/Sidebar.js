import React from 'react';
import { 
  Drawer, 
  List, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Button,
  Box
} from '@mui/material';
import { Link } from 'react-router-dom';  // Sử dụng Link để điều hướng
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import CampaignIcon from '@mui/icons-material/Campaign';
import EmailIcon from '@mui/icons-material/Email';
import AddIcon from '@mui/icons-material/Add';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import GroupsIcon from '@mui/icons-material/Groups';
import MailLockIcon from '@mui/icons-material/MailLock';


const Sidebar = () => {
  const menuItems = [
    { text: 'Trang Chủ', icon: <HomeIcon />, path: '/home' },
    { text: 'Contact', icon: <ContactMailIcon />, path: '/contact' },
    { text: 'Group', icon: <GroupsIcon />, path: '/group' },
    { text: 'Quản lý chiến dịch', icon: <CampaignIcon />, path: '/campaign-management' },
    { text: 'Mẫu Email', icon: <EmailIcon />, path: '/email-template' },
    { text: 'Email Marketing', icon: <MailLockIcon />, path: '/email-marketing' },
    { text: 'Quản lý người dùng', icon: <PeopleIcon />, path: '/user-management' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': { 
          width: 280, 
          boxSizing: 'border-box',
          bgcolor: 'background.default',
          pt: 1
        },
      }}
    >
      <Box sx={{ px: 2, mb: 2 }}>
        <Button
          component={Link}  // Sử dụng Link để điều hướng đến trang campaign-management
          to="/campaign-management"  // Đường dẫn trang campaign-management
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            width: '100%',
            py: 1.5,
            px: 3,
            borderRadius: 8,
            textTransform: 'none',
            boxShadow: '0 1px 2px 0 rgba(60,64,67,0.302), 0 1px 3px 1px rgba(60,64,67,0.149)'
          }}
        >
          Tạo chiến dịch
        </Button>
      </Box>
      
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            sx={{
              py: 1.5,
              px: 3,
              mx: 1,
              borderRadius: 2,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
              '&.Mui-selected': {
                backgroundColor: '#d3e3fd',
                color: '#001d35',
                '&:hover': {
                  backgroundColor: '#d3e3fd',
                },
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{
                fontSize: '0.875rem',
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
