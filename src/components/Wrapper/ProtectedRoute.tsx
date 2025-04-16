"use client";

import { useAuth } from "@/context/AuthProviders";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingPage from "../publicComponents/LoadingPage";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Don't redirect while loading
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  if (loading) {
    // You can show a loader, skeleton or shimmer here
    return <LoadingPage />;
  }

  if (!user) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
