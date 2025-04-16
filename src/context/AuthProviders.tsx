import { createContext, useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_AUTHUSER } from "@/graphql";
import LoadingPage from "@/components/publicComponents/LoadingPage";

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
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refetchUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, loading, refetch } = useQuery(GET_AUTHUSER);

  const refetchUser = () => {
    refetch();
  };

  return (
    <AuthContext.Provider
      value={{ user: data?.authUser, loading, refetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
