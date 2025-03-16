"use client";
import WheelModal from "@/components/modals/admin/WheelModal";
import Modal from "@/components/modals/Modal";
import WheelTable from "@/components/table/wheel/WheelTable";
import useModal from "@/hooks/useModal";

export default function CategoriesPanel() {
  const {setIsOpen, setModalChildren, setTitle} = useModal();
  return (
    <>
      <div className='main-div bg-primary px-16 py-4'>
        <h2 className='text-3xl'>Rozmiary kół</h2>
        <div className='overflow-y-auto max-h-[800px] w-4/12 min-w-[600px]'>
          <WheelTable/>
        </div>
        <div className='mt-4'>
          <button
            className='button-secondary mr-4'
            onClick={() => {
              setIsOpen(true);
              setModalChildren(<WheelModal/>);
              setTitle("Dodaj rozmiar koła");
            }}
          >
            Dodaj
          </button>
        </div>
      </div>
      <Modal/>
    </>
  );
}
