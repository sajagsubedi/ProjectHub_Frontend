"use client";

import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { AuthProvider } from "@/context/AuthProviders";

const client = new ApolloClient({
  link: createUploadLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
    credentials: "include",
    headers: {
      "apollo-require-preflight": "true",
    },
  }),
  cache: new InMemoryCache(),
});

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <ToastContainer />
        {children}
      </AuthProvider>
    </ApolloProvider>
  );
};

export default Wrapper;
