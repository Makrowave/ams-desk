import useAuth from "@/hooks/use_auth";
import useModal from "@/hooks/use_modal";
import { useState } from "react";
import PasswordModal from "../modals/auth/password_modal";
import AdminPasswordModal from "../modals/auth/admin_password_modal";
import UserPasswordModal from "../modals/auth/user_password_modal";
//Maybe create admin UserDropdown
export default function UserDropdown() {
  const { user, admin, logout, logoutAdmin, isAdmin } = useAuth();
  const [isClicked, setIsClicked] = useState(false);
  const { setIsOpen, setTitle, setModalChildren } = useModal();
  return (
    <div className='relative inline-block w-60 h-full justify-center'>
      <div
        className={
          isClicked
            ? "bg-secondary px-2 hover:bg-tertiary h-full border-l border-r border-border"
            : "bg-secondary px-2 hover:bg-tertiary h-full"
        }
        onClick={() => setIsClicked(!isClicked)}
      >
        <div className='flex items-center justify-center h-full'>
          <span className='text-2xl h-full leading-loose'>{isAdmin ? admin.username : user.username}</span>
          <img src='/chevron.png' className='h-2 ml-2' />
        </div>
      </div>
      {isClicked && (
        <ul className='absolute bg-secondary w-full z-20'>
          <li className='px-4 py-2 cursor-pointer hover:bg-tertiary border-t border-l border-r border-border'>
            <button
              className='h-full w-full'
              onClick={() => {
                setIsClicked(false);
                setTitle("Zmień hasło");
                if (isAdmin) setModalChildren(<AdminPasswordModal />);
                else setModalChildren(<UserPasswordModal />);
                setIsOpen(true);
              }}
            >
              <span className='text-2xl'>Zmień hasło</span>
            </button>
          </li>
          <li className='px-4 py-2 cursor-pointer hover:bg-tertiary border border-border'>
            <button
              className='h-full w-full'
              onClick={() => {
                setIsClicked(false);
                if (isAdmin) logoutAdmin();
                else logout();
              }}
            >
              <span className='text-2xl'>Wyloguj</span>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
