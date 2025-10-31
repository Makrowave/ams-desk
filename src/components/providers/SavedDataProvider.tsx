import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

export type SavedDataContextType = {
  isSaved: boolean;
  setIsSaved: Dispatch<SetStateAction<boolean>>;
  isUsed: boolean;
  updateIsUsed: (value: boolean) => void;
};

const SavedDataContext = createContext<SavedDataContextType | null>(null);

export function SavedDataProvider({ children }: { children: React.ReactNode }) {
  const [isSaved, setIsSaved] = useState(true);
  const [isUsed, setIsUsed] = useState(false);
  const updateIsUsed = (value: boolean) => {
    setIsUsed(value);
    setIsSaved(true);
  };
  const value: SavedDataContextType = {
    isSaved,
    setIsSaved,
    isUsed,
    updateIsUsed,
  };
  return (
    <SavedDataContext.Provider value={value}>
      {children}
    </SavedDataContext.Provider>
  );
}

export default SavedDataContext;
