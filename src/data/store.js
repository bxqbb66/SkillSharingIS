import { useState, useEffect, useCallback } from 'react';

// Minimal test
let _listeners = [];
function emit() { _listeners.forEach(fn => fn()); }
function subscribe(fn) { _listeners.push(fn); return () => { _listeners = _listeners.filter(f => f !== fn); }; }

export function useStore() {
  const [, setTick] = useState(0);
  useEffect(() => subscribe(() => setTick(t => t + 1)), []);
  return {
    getUsers: () => [],
    getOrders: () => [],
    getSkills: () => [],
  };
}

// Admin store stub
let _adminListeners = [];
let _currentAdmin = null;
export function useAdminStore() {
  const [, setTick] = useState(0);
  return { admin: null, isAdminLoggedIn: false, adminLogin: () => false, adminLogout: () => {} };
}

// Auth helpers stub
export function findUserById() { return null; }
export function createUser() { return {}; }
export function setCurrentUserId() {}
export function getCurrentUserId() { return '20210001'; }
