"use client";

import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

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
      <ToastContainer />
      {children}
    </ApolloProvider>
  );
};

export default Wrapper;
