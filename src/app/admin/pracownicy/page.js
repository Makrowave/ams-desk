"use client";
import Modal from "@/components/modals/modal";
import Navigation from "@/components/navigation/navigation";
import SideBar from "@/components/navigation/side_bar";
import AdminRoute from "@/components/routing/admin_route";
import EmployeeTable from "@/components/table/employee_table/employee_table";
export default function EmployeesPanel() {
  return (
    <AdminRoute>
      <Navigation active={3} />
      <main>
        <SideBar baseUrl={"/admin"} active={2}></SideBar>
        <div className='main-div bg-primary px-16 py-4 px-4'>
          <h2 className='text-3xl'>Pracownicy</h2>
          <div className="overflow-y-auto max-h-[600px] w-4/12 min-w-[600px]">
            <EmployeeTable />
          </div>
          <div className='mt-4'>
            <button className='button-secondary mr-4'>Dodaj pracownika</button>
            <button className='button-secondary'>Wyloguj wszystkich</button>
          </div>
        </div>
        <Modal />
      </main>
    </AdminRoute>
  );
}
