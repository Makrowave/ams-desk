import { Work_Sans } from "next/font/google";
import "./globals.css";

import ProviderWrapper from "@/components/providers/Providers";
const work_sans = Work_Sans({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Rowery",
  description: "System obsługi rowerów",
};

export default function RootLayout({ children }) {
  return (
    //overflow auto
    <html lang='en'>
      <body className={work_sans.className + " overflow-y-hidden text-xl h-100vh text-slate-600"}>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}
