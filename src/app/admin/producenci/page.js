"use client";
import CategoryModal from "@/components/modals/admin/CategoryModal";
import ManufacturerModal from "@/components/modals/admin/ManufacturerModal";
import Modal from "@/components/modals/Modal";
import Navigation from "@/components/navigation/Navigation";
import SideBar from "@/components/navigation/SideBar";
import AdminRoute from "@/components/routing/AdminRoute";
import ManufacturerTable from "@/components/table/manufacturer/ManufacturerTable";
import useModal from "@/hooks/useModal";

export default function CategoriesPanel() {
  const { setIsOpen, setModalChildren, setTitle } = useModal();
  return (
    <AdminRoute>
      <Navigation active={3} />
      <main>
        <SideBar baseUrl={"/admin"} active={6}></SideBar>
        <div className='main-div bg-primary px-16 py-4'>
          <h2 className='text-3xl'>Producenci</h2>
          <div className='overflow-y-auto max-h-[800px] w-4/12 min-w-[600px]'>
            <ManufacturerTable />
          </div>
          <div className='mt-4'>
            <button
              className='button-secondary mr-4'
              onClick={() => {
                setIsOpen(true);
                setModalChildren(<ManufacturerModal action='post' />);
                setTitle("Dodaj producenta");
              }}
            >
              Dodaj producenta
            </button>
          </div>
        </div>
        <Modal />
      </main>
    </AdminRoute>
  );
}
