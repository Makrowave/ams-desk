"use client";
import StatusModal from "@/components/modals/admin/StatusModal";
import Modal from "@/components/modals/Modal";
import Navigation from "@/components/navigation/Navigation";
import SideBar from "@/components/navigation/SideBar";
import AdminRoute from "@/components/routing/AdminRoute";
import StatusTable from "@/components/table/status/StatusTable";
import useModal from "@/hooks/useModal";

export default function StatusPanel() {
  const { setIsOpen, setModalChildren, setTitle } = useModal();
  return (
    <AdminRoute>
      <Navigation active={3} />
      <main>
        <SideBar baseUrl={"/admin"} active={3}></SideBar>
        <div className='main-div bg-primary py-4 px-10'>
          <h2 className='text-3xl'>Statusy</h2>
          <div className='overflow-y-auto max-h-[600px] w-4/12 min-w-[600px]'>
            <StatusTable />
          </div>
          <div className='mt-4'>
            <button
              className='button-secondary mr-4'
              onClick={() => {
                setIsOpen(true);
                setModalChildren(<StatusModal action='post' />);
                setTitle("Dodaj staus");
              }}
            >
              Dodaj status
            </button>
          </div>
        </div>
        <Modal />
      </main>
    </AdminRoute>
  );
}
