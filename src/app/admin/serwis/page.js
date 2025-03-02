"use client";
import EmployeeModal from "@/components/modals/admin/EmployeeModal";
import LogoutModal from "@/components/modals/admin/LogoutModal";
import UserModal from "@/components/modals/admin/UserModal";
import Modal from "@/components/modals/Modal";
import Navigation from "@/components/navigation/Navigation";
import SideBar from "@/components/navigation/SideBar";
import AdminRoute from "@/components/routing/AdminRoute";
import AccountTable from "@/components/table/account/AccountTable";
import EmployeeTable from "@/components/table/employee/EmployeeTable";
import useModal from "@/hooks/useModal";

export default function BikesPanel() {
  return (
    <AdminRoute>
      <Navigation active={3} />
      <main className='max-h-screen overflow-hidden'>
        <SideBar baseUrl={"/admin"} active={8}></SideBar>
        <div className='flex-row main-div bg-primary px-16 py-4'>
          <div className='w-4/12 min-w-[600px]'>
            <h2 className='text-3xl'>Części</h2>
            <div className='overflow-y-auto max-h-[600px] w-full'>{/*Tabela */}</div>
          </div>
          <div className='w-7/12 min-w-[600px] ml-auto'>
            <h2 className='text-3xl'>Usługi</h2>
            <div className='overflow-y-auto max-h-[600px] w-full'>{/*Tabela */}</div>
          </div>
        </div>
        <Modal />
      </main>
    </AdminRoute>
  );
}
