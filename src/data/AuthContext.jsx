import { createContext, useContext, useState, useCallback } from 'react';
import { findUserById, createUser, setCurrentUserId } from './store';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = useCallback((studentId, password) => {
    if (!studentId || !password) return false;

    // Admin login is handled in Login.jsx directly, skip here
    if (studentId === 'admin') return false;

    // Find existing user or create new one
    let foundUser = findUserById(studentId);
    if (!foundUser) {
      const displayName = studentId.length >= 6
        ? `用户${studentId.slice(-4)}`
        : studentId;
      foundUser = createUser(studentId, displayName);
    }

    setCurrentUserId(studentId);
    setUser({ ...foundUser });
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
