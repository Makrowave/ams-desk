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

    <html lang="en">
      <body className={inter.className + ' h-full overflow-auto'}>
        <ProviderWrapper>
          {children}
        </ProviderWrapper>
      </body>
    </html>
  );
}
