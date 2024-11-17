"use client";
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
// Firebase check
// Define the context type
interface AppContextType {
  appointmentDetails: appointmentDetailsType | string;
  setAppointmentDetails: Dispatch<SetStateAction<appointmentDetailsType | string>>;
  patientToken: string;
  setPatientToken: Dispatch<SetStateAction<string>>;
  adminToken: string;
  setAdminToken: Dispatch<SetStateAction<string>>;
}

// Create a Context with the appropriate type or undefined
const AppContext = createContext<AppContextType | undefined>(undefined);

// Define props for the provider
interface AppProviderProps {
  children: ReactNode;
}

interface appointmentDetailsType {
  drname:string;
  date:string;
}

// Create a Provider component
const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [appointmentDetails, setAppointmentDetails] = useState<appointmentDetailsType | string>('');
  const [patientToken, setPatientToken] = useState<string>("");
  const [adminToken, setAdminToken] = useState<string>("");

  return (
    <AppContext.Provider
      value={{
        appointmentDetails,
        setAppointmentDetails,
        patientToken,
        setPatientToken,
        adminToken,
        setAdminToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export { AppProvider, useAppContext };
