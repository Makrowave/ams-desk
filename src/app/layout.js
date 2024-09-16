
import { Inter } from "next/font/google";
import "./globals.css";
import { MyQueryProvider } from "@/components/my_query_provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rowery",
  description: "System obsługi rowerów",
};



export default function RootLayout({ children }) {
  return (
    <MyQueryProvider>
      <html lang="en">
        <body className={inter.className + ' h-full overflow-auto'}>{children}</body>
      </html>
    </MyQueryProvider>
  );
}
