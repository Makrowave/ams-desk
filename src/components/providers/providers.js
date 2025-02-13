"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthProvider } from "./AuthProvider";
import { ModalProvider } from "./ModalContext";
export default function ProviderWrapper({ children }) {
  const queryClient = new QueryClient();

  return (
    <AuthProvider>
      <ModalProvider>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </ModalProvider>
    </AuthProvider>
  );
}
