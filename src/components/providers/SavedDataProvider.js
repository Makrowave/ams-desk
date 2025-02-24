const { createContext, useState } = require("react");

const SavedDataContext = createContext();

export function SavedDataProvider({ children }) {
  const [isSaved, setIsSaved] = useState(true);
  const [isUsed, setIsUsed] = useState(false);
  const updateIsUsed = (value) => {
    setIsUsed(value);
    setIsSaved(true);
  };
  return (
    <SavedDataContext.Provider value={{ isSaved, setIsSaved, isUsed, updateIsUsed }}>
      {children}
    </SavedDataContext.Provider>
  );
}

export default SavedDataContext;
