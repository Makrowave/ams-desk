"use client";
import EmployeeModal from "@/components/modals/admin/EmployeeModal";
import LogoutModal from "@/components/modals/admin/LogoutModal";
import UserModal from "@/components/modals/admin/UserModal";
import Modal from "@/components/modals/Modal";
import AccountTable from "@/components/table/account/AccountTable";
import EmployeeTable from "@/components/table/employee/EmployeeTable";
import useModal from "@/hooks/useModal";

export default function EmployeesPanel() {
  const {setIsModalOpen, setModalContent, setModalTitle} = useModal();
  return (
    <>
      <div className='flex-row main-div bg-primary px-16 py-4'>
        <div className='w-4/12 min-w-[600px]'>
          <h2 className='text-3xl'>Pracownicy</h2>
          <div className='overflow-y-auto max-h-[600px] w-full'>
            <EmployeeTable/>
          </div>
          <div className='mt-4'>
            <button
              className='button-secondary mr-4'
              onClick={() => {
                setModalContent(<EmployeeModal action='post'/>);
                setModalTitle("Dodaj pracownika");
                setIsModalOpen(true);
              }}
            >
              Dodaj
            </button>
          </div>
        </div>
        <div className='w-7/12 min-w-[600px] ml-auto'>
          <h2 className='text-3xl'>Konta</h2>
          <div className='overflow-y-auto max-h-[600px] w-full'>
            <AccountTable/>
          </div>
          <div className='mt-4'>
            <button
              className='button-secondary mr-4'
              onClick={() => {
                setIsModalOpen(true);
                setModalContent(<UserModal action='post'/>);
                setModalTitle("Utwórz konto");
              }}
            >
              Dodaj
            </button>
            <button
              className='button-secondary mr-4'
              onClick={() => {
                setModalContent(<LogoutModal/>);
                setModalTitle("Wyloguj wszystkich");
                setIsModalOpen(true);
              }}
            >
              Wyloguj wszystkich
            </button>
          </div>
        </div>
      </div>
      <Modal/>
    </>
  );
}
