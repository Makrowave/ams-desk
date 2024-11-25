"use client";
import EmployeeModal from "@/components/modals/admin/employee_modal";
import LogoutModal from "@/components/modals/admin/logout_modal";
import UserModal from "@/components/modals/admin/user_modal";
import Modal from "@/components/modals/modal";
import Navigation from "@/components/navigation/navigation";
import SideBar from "@/components/navigation/side_bar";
import AdminRoute from "@/components/routing/admin_route";
import AccountTable from "@/components/table/account_table/account_table";
import EmployeeTable from "@/components/table/employee_table/employee_table";
import useModal from "@/hooks/use_modal";
export default function EmployeesPanel() {
  const { setIsOpen, setModalChildren, setTitle } = useModal();
  return (
    <AdminRoute>
      <Navigation active={3} />
      <main>
        <SideBar baseUrl={"/admin"} active={2}></SideBar>
        <div className='flex-row main-div bg-primary px-16 py-4'>
          <div className='w-4/12 min-w-[600px]'>
            <h2 className='text-3xl'>Pracownicy</h2>
            <div className='overflow-y-auto max-h-[600px] w-full'>
              <EmployeeTable />
            </div>
            <div className='mt-4'>
              <button
                className='button-secondary mr-4'
                onClick={() => {
                  setModalChildren(<EmployeeModal action='post' />);
                  setTitle("Dodaj pracownika");
                  setIsOpen(true);
                }}
              >
                Dodaj
              </button>
            </div>
          </div>
          <div className='w-7/12 min-w-[600px] ml-auto'>
            <h2 className='text-3xl'>Konta</h2>
            <div className='overflow-y-auto max-h-[600px] w-full'>
              <AccountTable />
            </div>
            <div className='mt-4'>
              <button
                className='button-secondary mr-4'
                onClick={() => {
                  setIsOpen(true);
                  setModalChildren(<UserModal action='post' />);
                  setTitle("Utwórz konto");
                }}
              >
                Dodaj
              </button>
              <button
                className='button-secondary mr-4'
                onClick={() => {
                  setModalChildren(<LogoutModal />);
                  setTitle("Wyloguj wszystkich");
                  setIsOpen(true);
                }}
              >
                Wyloguj wszystkich
              </button>
            </div>
          </div>
        </div>
        <Modal />
      </main>
    </AdminRoute>
  );
}
