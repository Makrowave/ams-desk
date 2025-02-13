import { useState } from "react";
import Filters from "./Filters";
import useModal from "@/hooks/useModal";
import ModelTable from "./ModelTable";
import AddModelModal from "@/components/modals/record/model/AddModelModal";

export default function FitlerModelTable() {
  const { setIsOpen, setModalChildren, setTitle } = useModal();
  function openModal() {
    setModalChildren(<AddModelModal />);
    setTitle("Dodaj rower");
    setIsOpen(true);
  }
  const [query, setQuery] = useState();
  return (
    <div className='main-div'>
      <div className='flex-1 grid grid-cols-6 py-5 rounded-b-xl overflow-hidden flex-col'>
        <Filters setQuery={setQuery} />
        <ModelTable filterSrc={query} />
        <div className='fixed bottom-0 align-center  flex w-full pointer-events-none'>
          <div className='justify-between max-w-1920 w-full m-auto px-5'>
            <button
              className='button-primary block mb-10 mr-4 ml-auto py-2 px-5 max-w-60  pointer-events-auto'
              onClick={() => openModal()}
            >
              Dodaj Model
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
