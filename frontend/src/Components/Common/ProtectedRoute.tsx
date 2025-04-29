import { useAuth } from '../../context/AuthContext';
import LockedContent from './LockedContent';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="protected-content">
        {children}
        <LockedContent />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute; 