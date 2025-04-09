"use client";

import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
  cache: new InMemoryCache(),
});

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloProvider client={client}>
      <ToastContainer />
      {children}
    </ApolloProvider>
  );
};

export default Wrapper;
