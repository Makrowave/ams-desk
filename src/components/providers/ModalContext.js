const { createContext, useState } = require("react");



const ModalContext = createContext();

export function ModalProvider({children}) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalChildren, setModalChildren] = useState(<></>);
  const [title, setTitle] = useState("");

  return (
    <ModalContext.Provider value={{isOpen, setIsOpen, modalChildren, setModalChildren, title, setTitle}}>
      {children}
    </ModalContext.Provider>
  )
}

export default ModalContext;