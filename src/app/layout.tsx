// 'use client';

import MainLayout from '../components/MainLayout';
import ProviderWrapper from '../components/providers/Providers';

export const metadata = {
  title: 'Rowery',
  description: 'System obsługi rowerów',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="pl">
      <ProviderWrapper>
        <MainLayout>{children}</MainLayout>
      </ProviderWrapper>
    </html>
  );
};

export default RootLayout;
