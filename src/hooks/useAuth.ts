import AuthContext, {
  AuthContextType,
} from '../components/providers/AuthProvider';
import { useContext } from 'react';

export default function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
