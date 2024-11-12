"use client";
import StatusModal from "@/components/modals/admin/status_modal";
import Modal from "@/components/modals/modal";
import Navigation from "@/components/navigation/navigation";
import SideBar from "@/components/navigation/side_bar";
import AdminRoute from "@/components/routing/admin_route";
import StatusTable from "@/components/table/status_table/status_table";
import useModal from "@/hooks/use_modal";

export default function StatusPanel() {
  const { setIsOpen, setModalChildren, setTitle } = useModal();
  return (
    <AdminRoute>
      <Navigation active={3} />
      <main>
        <SideBar baseUrl={"/admin"} active={3}></SideBar>
        <div className='main-div bg-primary px-16 py-4 px-10'>
          <h2 className='text-3xl'>Statusy</h2>
          <div className="overflow-y-auto max-h-[600px] w-4/12 min-w-[600px]">
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
