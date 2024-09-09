import { useState } from "react";

export default function Modal({buttonTitle, buttonClassName, children, title}) {
  const [visible, setVisible] = useState(false);

  return (
    <>
    <button className={buttonClassName} onClick={() => setVisible(!visible)}>{buttonTitle}</button>

    {
      visible && (
        <div className="fixed inset-0">
          <div className="bg-slate-100 flex flex-col w-4/12 h-2/4 absolute top-0 bottom-0 left-0 right-0 m-auto rounded-2xl border-slate-400 border-2 px-6">
            {/*Header*/}
            <div className="flex justify-between">
              <h2>{title}</h2>
              <button className="self-end" onClick={() => setVisible(!visible)}>X</button>
            </div>
            {/*Content*/}
            <div>
              {children}
            </div>
          </div>
        </div>
      )
    }
    </>
  )
}