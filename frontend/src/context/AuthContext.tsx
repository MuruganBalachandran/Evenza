import { createContext, useContext, useEffect, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, logout } from '../store/slices/authSlice';
import { selectUser, selectIsAuthenticated } from '../store/slices/authSlice';

interface AuthContextType {
  user: any | null;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          dispatch(setUser(JSON.parse(storedUser)));
        }
      } else {
        dispatch(logout());
        localStorage.removeItem('user');
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 