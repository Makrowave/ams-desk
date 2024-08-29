"use client";
 
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
 
 //I guess it has to be done this way???
export function MyQueryProvider({children}) {
  const [client] = React.useState(new QueryClient());
 
  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  );
}