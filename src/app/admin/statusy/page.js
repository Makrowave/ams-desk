"use client";
import StatusModal from "@/components/modals/admin/StatusModal";
import Modal from "@/components/modals/Modal";
import StatusTable from "@/components/table/status/StatusTable";
import useModal from "@/hooks/useModal";

export default function StatusPanel() {
  const {setIsOpen, setModalChildren, setTitle} = useModal();
  return (
    <>
      <div className='main-div bg-primary py-4 px-16'>
        <h2 className='text-3xl'>Statusy</h2>
        <div className='overflow-y-auto max-h-[600px] w-4/12 min-w-[600px]'>
          <StatusTable/>
        </div>
        <div className='mt-4'>
          <button
            className='button-secondary mr-4'
            onClick={() => {
              setIsOpen(true);
              setModalChildren(<StatusModal action='post'/>);
              setTitle("Dodaj staus");
            }}
          >
            Dodaj status
          </button>
        </div>
      </div>
      <Modal/>
    </>
  );
}
