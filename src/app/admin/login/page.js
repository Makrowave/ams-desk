import AdminLogin from "@/components/login/admin_login";
import Navigation from "@/components/navigation/navigation";
import PrivateRoute from "@/components/routing/private_route";

export default function AdminLoginPage() {
  return (
    <PrivateRoute login={true}>
      <Navigation active={3} />
      <AdminLogin />
    </PrivateRoute>
  );
}
