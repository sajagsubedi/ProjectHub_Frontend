"use client";

import { useAuth } from "@/context/AuthProviders";
import { useRouter } from "next/navigation";
import React from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  if (!isAuthenticated) {
    router.push("/signin");
  }
  return children;
};

export default ProtectedRoute;
