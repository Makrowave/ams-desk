"use client";
import CategoryModal from "@/components/modals/admin/category_modal";
import Modal from "@/components/modals/modal";
import Navigation from "@/components/navigation/navigation";
import SideBar from "@/components/navigation/side_bar";
import AdminRoute from "@/components/routing/admin_route";
import PrivateRoute from "@/components/routing/private_route";
import CategoryTable from "@/components/table/category_table/category_table";
import useModal from "@/hooks/use_modal";

export default function CategoriesPanel() {
  const { setIsOpen, setModalChildren, setTitle } = useModal();
  return (
    <AdminRoute>
      <Navigation active={3} />
      <main>
        <SideBar baseUrl={"/admin"} active={5}></SideBar>
        <div className='main-div bg-primary px-10 py-4'>
          <h2 className='text-3xl'>Kategorie</h2>
          <div>
            <CategoryTable />
          </div>
          <div className='mt-4'>
            <button
              className='button-secondary mr-4'
              onClick={() => {
                setIsOpen(true);
                setModalChildren(<CategoryModal action='post' />);
                setTitle("Dodaj kategorię");
              }}
            >
              Dodaj kategorię
            </button>
          </div>
        </div>
        <Modal />
      </main>
    </AdminRoute>
  );
}
