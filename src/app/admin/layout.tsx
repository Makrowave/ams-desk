'use client';
import Navigation from '../../components/navigation/Navigation';
import SideBar from '../../components/navigation/SideBar';
import AdminRoute from '../../components/routing/AdminRoute';
import { adminRoutes } from '../../components/routing/routes';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminRoute>
      <Navigation />
      <SideBar baseUrl={'/admin'} links={adminRoutes} />
      <main className="flex bg-primary ml-16 h-[calc(100vh-60px)] overflow-y-auto">
        {children}
      </main>
    </AdminRoute>
  );
};

export default AdminLayout;
