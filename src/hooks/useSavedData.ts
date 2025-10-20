import SavedDataContext from '../components/providers/SavedDataProvider';
import { useContext } from 'react';

const useSavedData = () => {
  const context = useContext(SavedDataContext);

  if (context === null) {
    throw new Error('useSavedData must be used within a SavedDataProvider');
  }
  return context;
};

export default useSavedData;
