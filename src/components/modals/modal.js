import useModal from "@/hooks/useModal";
import "./modal.css";
import { FaXmark } from "react-icons/fa6";
/**
 * Modal component which creates a popup with dimmer background.
 * To use modal you have to use it within ModalContextProvider.
 * To change modal values use:
 * setIsOpen - changes boolean to close/open modal;
 * setModalChildren - sets children for modal;
 * setTitle - sets title for modal;
 * To initally set modal content use above functions preferably
 * in the page or at the modal's parent component
 * (make sure it's nested in ModalContextProvider).
 * On close (pressing title bar's close button)
 * title is set to empty string and
 * modalChildren is set to fragment.
 * @returns ModalComponent
 */
export default function Modal() {
  const { isOpen, setIsOpen, modalChildren, setModalChildren, title, setTitle } = useModal();

  function handleClose() {
    setIsOpen(false);
    setModalChildren(<></>);
    setTitle("");
  }

  return (
    <>
      {isOpen && (
        <div className=''>
          <div className='fixed top-0 bottom-0 left-0 right-0 pointer-events-auto transparent-bg z-50'>
            <div className='bg-primary flex flex-col h-fit absolute top-0 bottom-0 left-0 right-0 m-auto rounded-2xl border-border border-2 min-h-80 min-w-[430px] max-w-[700px] w-fit'>
              {/*Header*/}
              <div className='flex justify-between bg-secondary rounded-t-2xl px-6 align-center h-10 shadow-md'>
                <h2 className='leading-10'>
                  <b>{title}</b>
                </h2>
                <button className='flex align-center items-center' onClick={() => handleClose()}>
                  <FaXmark />
                </button>
              </div>
              {/*Content*/}
              <div className='mx-6 pt-2 flex-grow flex'>{modalChildren}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
