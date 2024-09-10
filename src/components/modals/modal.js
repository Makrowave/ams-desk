import { useState } from "react";

export default function Modal({ buttonTitle, buttonClassName, children, title }) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <button className={buttonClassName + ' pointer-events-auto'} onClick={() => setVisible(!visible)}>{buttonTitle}</button>

      {
        visible && (
          <div className="fixed inset-0 pointer-events-auto transparent-bg z-10">
            <div className="bg-secondary flex flex-col w-fit h-fit absolute top-0 bottom-0 left-0 right-0 m-auto rounded-2xl border-border border-2">
              {/*Header*/}
              <div className="flex justify-between bg-tertiary rounded-t-2xl px-6">
                <h2>{title}</h2>
                <button className="self-end" onClick={() => setVisible(!visible)}>X</button>
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