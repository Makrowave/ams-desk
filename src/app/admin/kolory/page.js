"use client";
import ColorModal from "@/components/modals/admin/ColorModal";
import Modal from "@/components/modals/Modal";
import ColorTable from "@/components/table/color/ColorTable";
import useModal from "@/hooks/useModal";

export default function ColorsPanel() {
  const {setIsModalOpen, setModalContent, setModalTitle} = useModal();
  return (
    <>
      <div className=' bg-primary px-16 py-4'>
        <h2 className='text-3xl'>Kolory</h2>
        <div className='overflow-y-auto max-h-[600px] w-4/12 min-w-[600px]'>
          <ColorTable/>
        </div>
        <div className='mt-4'>
          <button
            className='button-secondary mr-4'
            onClick={() => {
              setIsModalOpen(true);
              setModalContent(<ColorModal action='post'/>);
              setModalTitle("Edytuj kolor");
            }}
          >
            Dodaj kolor
          </button>
        </div>
      </div>
      <Modal/>
    </>
  );
}
