import AdminLogin from "@/components/login/AdminLogin";
import Navigation from "@/components/navigation/Navigation";
import PrivateRoute from "@/components/routing/PrivateRoute";

export default function AdminLoginPage() {
  return (
    <PrivateRoute login={true}>
      <Navigation active={3} />
      <AdminLogin />
    </PrivateRoute>
  );
}
