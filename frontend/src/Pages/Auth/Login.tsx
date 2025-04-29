import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { login } from '../../services/authService';
import { useDispatch } from 'react-redux';
import { setUser, setLoading, setError } from '../../store/slices/authSlice';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = { email: '', password: '' };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) newErrors.email = 'Email is required.';
    else if (!emailRegex.test(email)) newErrors.email = 'Invalid email format.';

    if (!password) newErrors.password = 'Password is required.';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters long.';

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    dispatch(setLoading(true));
    try {
      const { user, mongoUser } = await login(email, password);
      console.log('Login successful:', { user, mongoUser });
      
      // Update Redux state
      dispatch(setUser(mongoUser));
      dispatch(setError(null));
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(mongoUser));
      navigate('/');
    } catch (error: any) {
      if (error.message === 'User not found') {
        setErrors(prev => ({ ...prev, email: 'User not found' }));
      } else if (error.message === 'Invalid password') {
        setErrors(prev => ({ ...prev, password: 'Invalid password' }));
      } else {
        setErrors(prev => ({ ...prev, email: error.message }));
      }
      dispatch(setError(error.message));
    } finally {
      setIsLoading(false);
      dispatch(setLoading(false));
    }
  };

  return (
    <motion.div 
      className="auth-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="login-card"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="login-header"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1>Welcome Back</h1>
          <p>Sign in to continue to your account</p>
        </motion.div>
        
        <motion.form 
          onSubmit={handleSubmit}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="remember-forgot">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>

          <motion.button 
            type="submit" 
            className="login-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </motion.button>

          <motion.div 
            className="signup-link"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Don't have an account?
            <Link to="/signup">Sign up</Link>
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default Login;