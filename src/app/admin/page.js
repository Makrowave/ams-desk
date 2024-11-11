"use client";
import Modal from "@/components/modals/modal";
import Navigation from "@/components/navigation/navigation";
import SideBar from "@/components/navigation/side_bar";
import AdminRoute from "@/components/routing/admin_route";
import PrivateRoute from "@/components/routing/private_route";

export default function AdminPanel() {
  return (
    <AdminRoute>
      <Navigation active={3} />
      <main>
        <SideBar baseUrl={"/admin"} active={0}></SideBar>
      </main>
      <Modal />
    </AdminRoute>
  );
}
