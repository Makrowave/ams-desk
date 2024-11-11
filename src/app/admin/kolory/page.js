"use client";
import ColorModal from "@/components/modals/admin/color_modal";
import Modal from "@/components/modals/modal";
import Navigation from "@/components/navigation/navigation";
import SideBar from "@/components/navigation/side_bar";
import AdminRoute from "@/components/routing/admin_route";
import PrivateRoute from "@/components/routing/private_route";
import ColorTable from "@/components/table/color_table/color_table";
import useModal from "@/hooks/use_modal";

export default function ColorsPanel() {
  const { setIsOpen, setModalChildren, setTitle } = useModal();
  return (
    <AdminRoute>
      <Navigation active={3} />
      <main>
        <SideBar baseUrl={"/admin"} active={4}></SideBar>
        <div className='main-div bg-primary px-10 py-4'>
          <h2 className='text-3xl'>Kolory</h2>
          <div>
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
