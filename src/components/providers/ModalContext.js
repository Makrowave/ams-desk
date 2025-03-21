const {createContext, useState} = require("react");


const ModalContext = createContext();

export function ModalProvider({children}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(<></>);
  const [modalTitle, setModalTitle] = useState("");

  return (
    <ModalContext.Provider value={{
      isModalOpen,
      setIsModalOpen,
      modalContent,
      setModalContent,
      modalTitle,
      setModalTitle
    }}>
      {children}
    </ModalContext.Provider>
  )
}

export default ModalContext;