import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { signup } from '../../services/authService';
import { useDispatch } from 'react-redux';
import { setUser, setLoading, setError } from '../../store/slices/authSlice';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    dispatch(setLoading(true));
    try {
      const { user, mongoUser } = await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      console.log('Signup successful:', { user, mongoUser });
      
      // Update Redux state
      dispatch(setUser(mongoUser));
      dispatch(setError(null));
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(mongoUser));
      
      // Navigate to home page
      navigate('/');
    } catch (error: any) {
      console.error('Signup error:', error);
      setErrors(prev => ({
        ...prev,
        email: error.message
      }));
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
        className="signup-card"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="signup-header"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1>Create Account</h1>
          <p>Join us to start creating and managing events</p>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>

          <motion.button 
            type="submit" 
            className="signup-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </motion.button>

          <motion.div 
            className="login-link"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Already have an account?
            <Link to="/login">Sign in</Link>
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default Signup;