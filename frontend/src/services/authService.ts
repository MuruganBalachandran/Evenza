import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import axios from 'axios';
import { auth } from "../config/firebase";
import { buildApiUrl } from "../config/api";

// Validation functions
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string): boolean => {
  const hasNumber = /\d/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return hasNumber && hasLetter && hasSymbol && password.length >= 8;
};

export const validateSignupData = async (email: string, password: string): Promise<{ isValid: boolean; error?: string }> => {
  if (!validateEmail(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  if (!validatePassword(password)) {
    return { isValid: false, error: 'Password must contain at least one number, one letter, one symbol, and be at least 8 characters long' };
  }

  try {
    // Check if email already exists in MongoDB
    const response = await axios.get(buildApiUrl(`users/email/${email}`));
    if (response.data) {
      return { isValid: false, error: 'Email already exists' };
    }
  } catch (error: any) {
    // 404 means user not found, which is what we want
    if (error.response && error.response.status !== 404) {
      console.error('Error checking email:', error);
      return { isValid: false, error: 'Error checking email availability' };
    }
  }

  return { isValid: true };
};

export const login = async (email: string, password: string): Promise<{ user: any; mongoUser: any }> => {
  try {
    // First sign in with Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Then get user data from MongoDB
    const mongoResponse = await axios.get(buildApiUrl(`users/email/${email}`));
    if (!mongoResponse.data) {
      throw new Error('User not found');
    }

    return {
      user,
      mongoUser: mongoResponse.data
    };
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      throw new Error('User not found');
    } else if (error.code === 'auth/wrong-password') {
      throw new Error('Invalid password');
    } else if (error.code === 'auth/user-not-found') {
      throw new Error('User not found');
    } else {
      throw new Error(error.message || 'Login failed');
    }
  }
};

export const signup = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    // Validate the data first
    const validation = await validateSignupData(userData.email, userData.password);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );

    const user = userCredential.user;

    // Store user data in MongoDB through API
    const response = await axios.post(buildApiUrl('users'), {
      user_id: user.uid,
      name: userData.name,
      email: userData.email,
      role: 'Member',
      preferences: {
        language: 'en',
        theme: 'light',
        email_notifications: true,
        sms_notifications: false
      },
      stats: {
        total_events: 0,
        events_attended: 0,
        saved_events: 0
      },
      created_at: new Date(),
      updated_at: new Date()
    });

    return {
      user,
      mongoUser: response.data
    };
  } catch (error: any) {
    // If MongoDB creation fails, delete the Firebase user to maintain consistency
    if (error.response && error.response.status >= 400) {
      try {
        const firebaseUser = auth.currentUser;
        if (firebaseUser) {
          await firebaseUser.delete();
        }
      } catch (deleteError) {
        console.error('Failed to clean up Firebase user after MongoDB error:', deleteError);
      }
    }
    
    throw new Error(error.message || 'Signup failed');
  }
};