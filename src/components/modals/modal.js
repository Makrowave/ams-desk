import { useState } from "react";
import Image from 'next/image'
import UseModal from "@/hooks/use_modal";
export default function Modal() {
  const {isOpen, setIsOpen, modalChildren, setModalChildren, title, setTitle} = UseModal();

  function handleClose() {
    setIsOpen(false);
    setModalChildren(<></>);
    setTitle("");
  }

  return (
    <>
      {
        isOpen && (
          <div className="">
          <div className="fixed top-0 bottom-0 left-0 right-0 pointer-events-auto transparent-bg z-10">
            <div className="bg-primary flex flex-col w-fit h-fit absolute top-0 bottom-0 left-0 right-0 m-auto rounded-2xl border-border border-2 min-w-80 min-h-80">
              {/*Header*/}
              <div className="flex justify-between bg-secondary rounded-t-2xl px-6 align-center h-10 shadow-md">
                <h2 className="leading-10">{title}</h2>
                <button className="flex align-center " onClick={() => handleClose()}>
                  <img className='h-5 self-center px-1' src='/close.png' /> 
                </button>
              </div>
              {/*Content*/}
              <div className="mx-6 pt-2">
                {modalChildren}
              </div>
            </div>
          </div>
          </div>
        )
      }
    </>
  )
}