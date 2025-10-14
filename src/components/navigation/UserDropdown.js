import useAuth from '@/hooks/useAuth';
import { useState } from 'react';
import AdminPasswordModal from '../modals/auth/AdminPasswordModal';
import UserPasswordModal from '../modals/auth/UserPasswordModal';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import SavedDataWarning from './SavedDataWarning';
import MaterialModal from '@/components/modals/MaterialModal';
import { Button, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
//Maybe create admin UserDropdown
export default function UserDropdown() {
  const { user, admin, logout, logoutAdmin, isAdmin } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleLogout = (e) => {
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
    // {isClicked && (
    //   <ul className="absolute bg-secondary w-full z-20">
    //     <li className="px-4 py-2 cursor-pointer hover:bg-tertiary border-t border-l border-r border-border">

    //     </li>
    //     <li className="px-4 py-2 cursor-pointer hover:bg-tertiary border border-border">
    //       <button
    //         className="h-full w-full"

    //       >
    //         <SavedDataWarning>
    //           <span className="text-2xl">Wyloguj</span>
    //         </SavedDataWarning>
    //       </button>
    //     </li>
    //   </ul>
    // )}
  );
}
