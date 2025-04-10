"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_AUTHUSER } from "@/graphql";

interface User {
  _id?: string;
  username?: string;
  email?: string;
  fullName?: string;
  avatar?: {
    url?: string;
    public_id?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  refetchUser: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refetchUser: () => {},
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, loading, refetch } = useQuery(GET_AUTHUSER);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (data?.authUser) {
      setUser(data.authUser.user);
      setIsAuthenticated(data.authUser.isAuthenticated);
      console.log("user", data.authUser);
    } else {
      setUser(null);
    }
  }, [data]);

  const refetchUser = () => {
    refetch();
  };
  if (!isClient || loading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, refetchUser, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
