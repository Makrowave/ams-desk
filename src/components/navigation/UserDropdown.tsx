import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import AdminPasswordModal from '../modals/auth/AdminPasswordModal';
import UserPasswordModal from '../modals/auth/UserPasswordModal';
import SavedDataWarning from './SavedDataWarning';
import MaterialModal from '../modals/MaterialModal';
import { Button, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

export default function UserDropdown() {
  const { user, admin, logout, logoutAdmin, isAdmin } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLogout = () => {
    setAnchorEl(null);
    if (isAdmin) {
      logoutAdmin();
    } else {
      logout();
    }
  };

  return (
    <>
      <Button
        onClick={(event) => setAnchorEl(event.currentTarget)}
        sx={{ color: 'inherit', ml: 'auto' }}
      >
        {isAdmin ? admin.username : user.username}
        <AccountCircle sx={{ ml: 1 }} />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <SavedDataWarning>
          <MaterialModal
            label={'Zmień hasło'}
            button={<MenuItem>Zmień hasło</MenuItem>}
          >
            {isAdmin ? <AdminPasswordModal /> : <UserPasswordModal />}
          </MaterialModal>
          <MenuItem onClick={handleLogout}>Wyloguj się</MenuItem>
        </SavedDataWarning>
      </Menu>
    </>
  );
}
