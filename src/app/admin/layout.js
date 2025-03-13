import Navigation from "@/components/navigation/Navigation";
import SideBar from "@/components/navigation/SideBar";
import AdminRoute from "@/components/routing/AdminRoute";

export default function AdminLayout({ children }) {
  return (
    <AdminRoute>
      <Navigation active={3} />
      <main className='flex bg-primary ml-16 h-[calc(100vh-48px)] overflow-y-auto'>
        <SideBar baseUrl={"/admin"} />
        {children}
      </main>
    </AdminRoute>
  );
}
