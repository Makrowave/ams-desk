'use client';
import AdminLogin from '../../components/login/AdminLogin';
import Navigation from '../../components/navigation/Navigation';
import PrivateRoute from '../../components/routing/PrivateRoute';

function AdminLoginPage() {
  return (
    <PrivateRoute>
      <Navigation />
      <main className="h-[calc(100vh-48px)]">
        <AdminLogin />
      </main>
    </PrivateRoute>
  );
}

export default AdminLoginPage;
