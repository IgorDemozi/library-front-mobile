import { createContext, ReactNode, useContext, useState } from 'react';
import { api } from '../api';

interface AuthProviderProps {
  children: ReactNode;
}

interface IAuthContext {
  userEmail: string;
  token: string;
  signIn(email: string, password: string): Promise<string>;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

function AuthProvider({ children }: AuthProviderProps) {
  const [userEmail, setUserEmail] = useState('');
  const [token, setToken] = useState('');

  async function signIn(email: string, password: string): Promise<string> {
    let isSignedIn = '';

    await api
      .post('/login', {
        email: email,
        password: password,
      })
      .then(res => {
        const { token } = res.data;

        setUserEmail(email);
        setToken(token);

        if (token && res.data.auth) {
          isSignedIn = 'success';
        } else {
          isSignedIn = 'Não foi possivel conectar ao servidor!';
        }
      })
      .catch(err => {
        console.log('error => ', err);

        if (err.response.status === 404) {
          isSignedIn = 'Não foi possivel conectar ao servidor!';
        } else {
          isSignedIn = err.response?.data[0].message;
        }
      });

    return isSignedIn;
  }

  return (
    <AuthContext.Provider value={{ userEmail, token, signIn }}>{children}</AuthContext.Provider>
  );
}

function useAuthContext() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuthContext };
