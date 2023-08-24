import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';


interface AuthContextValue {
  user: User | null,
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
})


export const AuthContextProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // Change this to the actual user type
  const [token, _setToken] = useState<string | null>(localStorage.getItem(import.meta.env['VITE_API_TOKEN_KEY']));

  const setToken = (newToken: string | null) => {
    _setToken(newToken);
    if(newToken) {
      localStorage.setItem(import.meta.env['VITE_API_TOKEN_KEY'], newToken);
    } else {
      localStorage.removeItem(import.meta.env['VITE_API_TOKEN_KEY']);
    }
  }

  const contextValue: AuthContextValue = {
    user: user,
    token: token,
    setUser: setUser,
    setToken: setToken,
  };

  return (
    <AuthContext.Provider value={ contextValue }>
      { children }
    </AuthContext.Provider>
  )
}

// Custom hook to consume AuthContext directly
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext<AuthContextValue>(AuthContext);