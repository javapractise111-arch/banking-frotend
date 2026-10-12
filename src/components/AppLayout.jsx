import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  Avatar,
  Stack,
  Badge
} from '@mui/material';
import {
  DashboardRounded,
  AccountBalanceWalletRounded,
  SyncAltRounded,
  PeopleRounded,
  CalendarMonthRounded,
  DescriptionRounded,
  NotificationsRounded,
  PersonRounded,
  LogoutRounded,
  MenuRounded
} from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { label: 'Dashboard', to: '/', icon: <DashboardRounded /> },
  { label: 'Accounts', to: '/accounts', icon: <AccountBalanceWalletRounded /> },
  { label: 'Transfers', to: '/transfers', icon: <SyncAltRounded /> },
  { label: 'Beneficiaries', to: '/beneficiaries', icon: <PeopleRounded /> },
  { label: 'Payments', to: '/payments', icon: <CalendarMonthRounded /> },
  { label: 'Statements', to: '/statements', icon: <DescriptionRounded /> },
  { label: 'Notifications', to: '/notifications', icon: <NotificationsRounded /> },
  { label: 'Profile', to: '/profile', icon: <PersonRounded /> }
];

export default function AppLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const drawer = (
    <Box sx={{ width: 260, pt: 2 }}>
      <Box sx={{ px: 2, pb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>Banking Portal</Typography>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => {
          const selected = location.pathname === item.to;
          return (
            <ListItemButton key={item.to} component={Link} to={item.to} selected={selected} sx={{ mx: 1, borderRadius: 2 }}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>
      <Divider sx={{ my: 1 }} />
      <List>
        <ListItemButton onClick={handleLogout} sx={{ mx: 1, borderRadius: 2 }}>
          <ListItemIcon><LogoutRounded /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f7fb' }}>
      <AppBar position="sticky" elevation={0} sx={{ background: '#ffffff', color: '#112240', borderBottom: '1px solid rgba(17,34,64,0.08)' }}>
        <Toolbar sx={{ gap: 2 }}>
          <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(!mobileOpen)} sx={{ display: { xs: 'block', md: 'none' } }}>
            <MenuRounded />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />

          <Stack direction="row" spacing={2} alignItems="center">
            <Badge badgeContent={3} color="error">
              <IconButton color="inherit">
                <NotificationsRounded />
              </IconButton>
            </Badge>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                {user?.firstName?.[0] || 'U'}
              </Avatar>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                {user ? `${user.firstName} ${user.lastName}` : 'Customer'}
              </Typography>
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex' }}>
        <Box component="nav" sx={{ display: { xs: 'none', md: 'block' }, width: 260, flexShrink: 0, background: '#fff', borderRight: '1px solid rgba(17,34,64,0.08)' }}>
          {drawer}
        </Box>

        <Drawer variant="temporary" open={mobileOpen} onClose={() => setMobileOpen(false)} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', md: 'none' } }}>
          {drawer}
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
