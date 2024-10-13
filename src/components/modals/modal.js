import { useState } from "react";
import Image from 'next/image'
export default function Modal({ buttonTitle, buttonClassName, children, title }) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <button className={buttonClassName + ' pointer-events-auto'} onClick={() => setVisible(!visible)}>{buttonTitle}</button>
      {
        visible && (
          <div className="fixed top-0 bottom-0 left-0 right-0 pointer-events-auto transparent-bg z-10">
            <div className="bg-primary flex flex-col w-fit h-fit absolute top-0 bottom-0 left-0 right-0 m-auto rounded-2xl border-border border-2 min-w-80 min-h-80">
              {/*Header*/}
              <div className="flex justify-between bg-secondary rounded-t-2xl px-6 align-center h-10 shadow-md">
                <h2 className="leading-10">{title}</h2>
                <button className="flex align-center " onClick={() => setVisible(!visible)}>
                  <img className='h-5 self-center px-1' src='/close.png' /> 
                </button>
              </div>
              {/*Content*/}
              <div className="mx-6 pt-2">
                {children}
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}