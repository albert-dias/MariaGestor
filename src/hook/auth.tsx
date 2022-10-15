import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from "react";
import { toast } from "react-toastify";
import api from "../services/api";
// import {io, Socket} from "socket.io-client";

interface User {
  id: string;
  name: string;
  is_adm: number;
  fullname: string;
  document: string;
  email: string;
  id_empresa: number;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  document: string;
  password: string;
  confirm_password?: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: any) => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@MariaGestor:token");
    const user = localStorage.getItem("@MariaGestor:user");

    if (token && user) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const verifyToken = useCallback(async () => {
    api
      .get("/users/me")
      .then((res) => {
        // console.log(res.status);
        if (res.status !== 200) {
          signOut();
        }
      })
      .catch((e) => {
        // console.log(e);
        signOut();
      });
  }, []);

  useEffect(() => {
    if (data.user) {
      verifyToken();
    }
  }, []);

  const signIn = useCallback(
    async ({ document, password }: SignInCredentials) => {
      setLoading(true);
      try {
        const response = await api.post("/session/login", {
          document,
          password,
        });

        const { token, user } = response.data;

        localStorage.setItem("@MariaGestor:token", token);
        localStorage.setItem("@MariaGestor:user", JSON.stringify(user));

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setData({ token, user });
        setLoading(false);
      } catch (e) {
        setLoading(false);
        toast.error("CPF ou senha incorretos");
      }
    },
    []
  );

  const signOut = useCallback(() => {
    localStorage.removeItem("@MariaGestor:token");
    localStorage.removeItem("@MariaGestor:user");

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
