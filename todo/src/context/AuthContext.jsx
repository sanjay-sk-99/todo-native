import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  //store the token and loading state
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <AuthContext.Provider value={{ token, setToken, setLoading, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
