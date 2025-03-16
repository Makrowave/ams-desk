"use client";

import React from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {AuthProvider} from "./AuthProvider";
import {ModalProvider} from "./ModalContext";
import {SavedDataProvider} from "./SavedDataProvider";

export default function ProviderWrapper({children}) {
  const queryClient = new QueryClient();

  return (
    <AuthProvider>
      <ModalProvider>
        <SavedDataProvider>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </SavedDataProvider>
      </ModalProvider>
    </AuthProvider>
  );
}
