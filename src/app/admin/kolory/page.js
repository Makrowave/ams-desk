"use client";
import ColorModal from "@/components/modals/admin/ColorModal";
import Modal from "@/components/modals/Modal";
import Navigation from "@/components/navigation/Navigation";
import SideBar from "@/components/navigation/SideBar";
import AdminRoute from "@/components/routing/AdminRoute";
import ColorTable from "@/components/table/color/ColorTable";
import useModal from "@/hooks/useModal";

export default function ColorsPanel() {
  const { setIsOpen, setModalChildren, setTitle } = useModal();
  return (
    <>
      <div className=' bg-primary px-16 py-4'>
        <h2 className='text-3xl'>Kolory</h2>
        <div className='overflow-y-auto max-h-[600px] w-4/12 min-w-[600px]'>
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
    </>
  );
}
