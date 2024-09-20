'use client'

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import {AuthProvider} from "./auth_provider";
export default function ProviderWrapper({ children }) {
  const [client] = React.useState(new QueryClient());

  return (
    <AuthProvider>
      <QueryClientProvider client={client}>
        {children}
      </QueryClientProvider>
    </AuthProvider>
  );
}