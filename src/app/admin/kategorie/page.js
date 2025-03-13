"use client";
import CategoryModal from "@/components/modals/admin/CategoryModal";
import Modal from "@/components/modals/Modal";
import CategoryTable from "@/components/table/category/CategoryTable";
import useModal from "@/hooks/useModal";

export default function CategoriesPanel() {
    const {setIsOpen, setModalChildren, setTitle} = useModal();
    return (
        <div>
            <div className='bg-primary px-16 py-4'>
                <h2 className='text-3xl'>Kategorie</h2>
                <div className='overflow-y-auto max-h-[800px] w-4/12 min-w-[600px]'>
                    <CategoryTable/>
                </div>
                <div className='mt-4'>
                    <button
                        className='button-secondary mr-4'
                        onClick={() => {
                            setIsOpen(true);
                            setModalChildren(<CategoryModal action='post'/>);
                            setTitle("Dodaj kategorię");
                        }}
                    >
                        Dodaj kategorię
                    </button>
                </div>
            </div>
            <Modal/>
        </div>
    );
}
