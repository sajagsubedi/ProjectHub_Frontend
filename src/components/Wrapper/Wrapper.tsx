"use client";

import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  Observable,
} from "@apollo/client";
import { ToastContainer } from "react-toastify";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { AuthProvider } from "@/context/AuthProviders";
import { setContext } from "@apollo/client/link/context";
import { refreshAccessToken } from "@/helpers/refreshAccessToken";
import { onError } from "@apollo/client/link/error";

const uploadLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
  credentials: "include",
  headers: {
    "apollo-require-preflight": "true",
  },
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        if (err?.extensions?.code === "UNAUTHORIZED") {
          if (operation.operationName == "RefetchAccessToken") {
            return forward(operation);
          }
          return new Observable((observer) => {
            refreshAccessToken()
              .then((value: { accessToken: string }) => {
                const newAccessToken = value.accessToken;
                console.log("refetched token is ", value);
                if (newAccessToken) {
                  localStorage.setItem("accessToken", newAccessToken);
                }

                const oldHeaders = operation.getContext().headers;
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    accessToken: newAccessToken ? newAccessToken : "",
                  },
                });

                forward(operation).subscribe({
                  next: (result) => observer.next(result),
                  error: (error) => observer.error(error),
                  complete: () => observer.complete(),
                });
              })
              .catch((error) => {
                console.error("Token refresh failed:", error);
                observer.error(error);
              });
          });
        }
      }
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  }
);

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const accessToken = localStorage.getItem("accessToken");
  return {
    headers: {
      ...headers,
      accessToken: accessToken ? accessToken : "",
    },
  };
});

export const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(uploadLink)),
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
