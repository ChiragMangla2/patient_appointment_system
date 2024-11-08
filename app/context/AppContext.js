"use client";
import { createContext, useContext, useState } from 'react';

// Create a Context
const AppContext = createContext();

// Create a Provider component
export const AppProvider = ({ children }) => {
  const [appointmentDetails,setAppointmentDetails] = useState('');
  const [patientToken,setPatientToken] = useState('');
  const [adminToken,setAdminToken] = useState('');

  return (
    <AppContext.Provider value={{ appointmentDetails,setAppointmentDetails,patientToken,setPatientToken,adminToken,setAdminToken }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = () => useContext(AppContext);
