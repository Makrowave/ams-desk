'use client';
import AdminLogin from '../../components/login/AdminLogin';
import Navigation from '../../components/navigation/Navigation';
import PrivateRoute from '../../components/routing/PrivateRoute';

function AdminLoginPage() {
  return (
    <PrivateRoute>
      <AdminLogin />
    </PrivateRoute>
  );
}

export default AdminLoginPage;
