import SavedDataContext from '../components/providers/SavedDataProvider';
import { useContext } from 'react';

export default function useSavedData() {
  if (!SavedDataContext) {
    throw new Error('useSavedData must be used within a SavedDataProvider');
  }
  return useContext(SavedDataContext);
}
