import AdminLogin from '../../components/login/AdminLogin';
import Navigation from '../../components/navigation/Navigation';
import PrivateRoute from '../../components/routing/PrivateRoute';

const AdminLoginPage = () => {
  return (
    <PrivateRoute>
      <Navigation />
      <main className="h-[calc(100vh-48px)]">
        <AdminLogin />
      </main>
    </PrivateRoute>
  );
};

export default AdminLoginPage;
