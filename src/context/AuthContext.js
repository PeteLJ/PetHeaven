// src/context/AuthContext.js
import React, { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

// Define staff credentials
const STAFF_CREDENTIALS = {
  username: 'staff',
  password: 'staff123'
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return { ...state, user: action.payload, staff: null };
    case 'LOGIN_STAFF':
      return { ...state, staff: action.payload, user: null };
    case 'LOGOUT_USER':
      return { ...state, user: null };
    case 'LOGOUT_STAFF':
      return { ...state, staff: null };
    case 'UPDATE_USER_SUPPORTER_STATUS':
      // Update the user object in state with the new supporter status
      if (state.user && state.user.id === action.payload.id) {
        return { ...state, user: { ...state.user, supporter: action.payload.supporter } };
      }
      return state;
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null, staff: null });

  const login = (userData, isStaff = false) => {
    if (isStaff) {
      dispatch({ type: 'LOGIN_STAFF', payload: userData });
    } else {
      dispatch({ type: 'LOGIN_USER', payload: userData });
    }
  };

  const logout = (isStaff = false) => {
    if (isStaff) {
      dispatch({ type: 'LOGOUT_STAFF' });
    } else {
      dispatch({ type: 'LOGOUT_USER' });
    }
  };

  // Function to update user's supporter status
  const updateUserSupporterStatus = (userId, isSupporter) => {
    // Update the user object in local storage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = storedUsers.map(user =>
      user.id === userId ? { ...user, supporter: isSupporter } : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Update the user object in the React state
    dispatch({
      type: 'UPDATE_USER_SUPPORTER_STATUS',
      payload: { id: userId, supporter: isSupporter }
    });
  };

  // Helper function to check if staff is logged in
  const isStaffLoggedIn = !!state.staff;

  // Helper function to check if user is logged in
  const isUserLoggedIn = !!state.user;

  // Function to handle staff login
  const loginStaff = (username, password) => {
    if (username === STAFF_CREDENTIALS.username && password === STAFF_CREDENTIALS.password) {
      login({ username }, true); // Pass true to staff
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{
      user: state.user,
      staff: state.staff,
      login,
      logout,
      isStaffLoggedIn,
      isUserLoggedIn,
      loginStaff,
      updateUserSupporterStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};