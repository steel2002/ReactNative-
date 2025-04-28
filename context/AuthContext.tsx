import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  loginWithPhone: (phone: string, otp: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  isLoading: false,
  error: null,
};

const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: async () => {},
  loginWithPhone: async () => {},
  logout: () => {},
  register: async () => {},
  forgotPassword: async () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, setState] = useState<AuthState>(initialState);

  // Mock login functionality
  const login = async (email: string, password: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Mock successful login
      if (email && password) {
        setState({
          isLoggedIn: true,
          user: { id: '1', email, name: 'Dream User' },
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      }));
    }
  };

  const loginWithPhone = async (phone: string, otp: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Mock successful login
      if (phone && otp === '1234') {
        setState({
          isLoggedIn: true,
          user: { id: '2', phone, name: 'Dream User' },
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error('Invalid OTP');
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      }));
    }
  };

  const logout = () => {
    setState(initialState);
  };

  const register = async (email: string, password: string, name: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Mock successful registration
      if (email && password && name) {
        setState({
          isLoggedIn: true,
          user: { id: '3', email, name },
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error('Please fill all required fields');
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Registration failed',
      }));
    }
  };

  const forgotPassword = async (email: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      if (email) {
        // Just reset the loading state, don't log in
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: null,
        }));
      } else {
        throw new Error('Please provide an email address');
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Password reset failed',
      }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        loginWithPhone,
        logout,
        register,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};