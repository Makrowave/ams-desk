import UseModal from "@/hooks/use_modal";

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
  const { isOpen, setIsOpen, modalChildren, setModalChildren, title, setTitle } = UseModal();

  function handleClose() {
    setIsOpen(false);
    setModalChildren(<></>);
    setTitle("");
  }

  return (
    <>
      {isOpen && (
        <div className=''>
          <div className='fixed top-0 bottom-0 left-0 right-0 pointer-events-auto transparent-bg z-10'>
            <div className='bg-primary flex flex-col w-fit h-fit absolute top-0 bottom-0 left-0 right-0 m-auto rounded-2xl border-border border-2 min-h-80 min-w-80'>
              {/*Header*/}
              <div className='flex justify-between bg-secondary rounded-t-2xl px-6 align-center h-10 shadow-md'>
                <h2 className='leading-10'>
                  <b>{title}</b>
                </h2>
                <button className='flex align-center ' onClick={() => handleClose()}>
                  <img className='h-5 self-center px-1' src='/close.png' />
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
