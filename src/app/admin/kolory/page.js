"use client";
import ColorModal from "@/components/modals/admin/color_modal";
import Modal from "@/components/modals/modal";
import Navigation from "@/components/navigation/navigation";
import SideBar from "@/components/navigation/side_bar";
import AdminRoute from "@/components/routing/admin_route";
import ColorTable from "@/components/table/color_table/color_table";
import useModal from "@/hooks/use_modal";

export default function ColorsPanel() {
  const { setIsOpen, setModalChildren, setTitle } = useModal();
  return (
    <AdminRoute>
      <Navigation active={3} />
      <main>
        <SideBar baseUrl={"/admin"} active={4}></SideBar>
        <div className='main-div bg-primary px-16 py-4'>
          <h2 className='text-3xl'>Kolory</h2>
          <div className="overflow-y-auto max-h-[600px] w-4/12 min-w-[600px]">
            <ColorTable />
          </div>
          <div className='mt-4'>
            <button
              className='button-secondary mr-4'
              onClick={() => {
                setIsOpen(true);
                setModalChildren(<ColorModal action='post' />);
                setTitle("Edytuj kolor");
              }}
            >
              Dodaj kolor
            </button>
          </div>
        </div>
        <Modal />
      </main>
    </AdminRoute>
  );
}
