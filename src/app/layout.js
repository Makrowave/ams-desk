import { Inter } from "next/font/google";
import "./globals.css";

import ProviderWrapper from "@/components/providers/providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rowery",
  description: "System obsługi rowerów",
};



export default function RootLayout({ children}) {
  return (
//overflow auto
    <html lang="en">
      <body className={inter.className + 'overflow-hidden text-xl'}>
        <ProviderWrapper>
          {children}
        </ProviderWrapper>
      </body>
    </html>
  );
}
