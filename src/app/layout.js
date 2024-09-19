
import { Inter } from "next/font/google";
import "./globals.css";

import ProviderWrapper from "@/components/providers/providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rowery",
  description: "System obsługi rowerów",
};



export default function RootLayout({ children }) {
  return (
    <ProviderWrapper>
      <html lang="en">
        <body className={inter.className + ' h-full overflow-auto'}>{children}</body>
      </html>
    </ProviderWrapper>
  );
}
