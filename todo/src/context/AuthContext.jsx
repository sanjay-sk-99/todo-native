import { createContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  //store the token and loading state
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const logIn = async (tokenvalue) => {
    try {
      await SecureStore.setItemAsync('token',tokenvalue)
      setToken(tokenvalue);
    } catch (e) {
      console.log("Error setting the token", e);
    }
  };

  const logOut = async () => {
    try {
      await SecureStore.deleteItemAsync('token')
      setToken(null);
    } catch (e) {
      console.log("Error removing the token", e);
    }
  };

  //To check login state for initial rendering
  useEffect(() => {
    const token = async () => {
      try {
        const stored = await SecureStore.getItemAsync('token')
        if (stored) {
          setToken(stored);
        }
      } catch (e) {
        console.log("Error fetching token", e);
      } finally {
        setLoading(false);
      }
    };
    token();
  }, []);
  return (
    <AuthContext.Provider value={{ token, logIn, logOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
