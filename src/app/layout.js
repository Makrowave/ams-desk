import { Work_Sans } from 'next/font/google';
import './globals.css';
import MainLayout from '@/components/MainLayout';
import ProviderWrapper from '@/components/providers/Providers';

const work_sans = Work_Sans({
  subsets: ['latin'],
  weight: '400',
});

export const metadata = {
  title: 'Rowery',
  description: 'System obsługi rowerów',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <ProviderWrapper>
        <MainLayout>{children}</MainLayout>
      </ProviderWrapper>
    </html>
  );
}
