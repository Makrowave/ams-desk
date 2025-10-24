// 'use client';

import Layout from '../components/navigation/Layout';
import ProviderWrapper from '../components/providers/Providers';

export const metadata = {
  title: 'Rowery',
  description: 'System obsługi rowerów',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="pl">
      <ProviderWrapper>
        <Layout>{children}</Layout>
      </ProviderWrapper>
    </html>
  );
};

export default RootLayout;
