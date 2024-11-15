"use client";
import CategoryModal from "@/components/modals/admin/category_modal";
import WheelModal from "@/components/modals/admin/wheel_modal";
import Modal from "@/components/modals/modal";
import Navigation from "@/components/navigation/navigation";
import SideBar from "@/components/navigation/side_bar";
import AdminRoute from "@/components/routing/admin_route";
import WheelTable from "@/components/table/wheel_table/wheel_table";
import useModal from "@/hooks/use_modal";

export default function CategoriesPanel() {
  const { setIsOpen, setModalChildren, setTitle } = useModal();
  return (
    <AdminRoute>
      <Navigation active={3} />
      <main>
        <SideBar baseUrl={"/admin"} active={5}></SideBar>
        <div className='main-div bg-primary px-16 py-4'>
          <h2 className='text-3xl'>Rozmiary kół</h2>
          <div className='overflow-y-auto max-h-[800px] w-4/12 min-w-[600px]'>
            <WheelTable />
          </div>
          <div className='mt-4'>
            <button
              className='button-secondary mr-4'
              onClick={() => {
                setIsOpen(true);
                setModalChildren(<WheelModal />);
                setTitle("Dodaj rozmiar koła");
              }}
            >
              Dodaj
            </button>
          </div>
        </div>
        <Modal />
      </main>
    </AdminRoute>
  );
}
