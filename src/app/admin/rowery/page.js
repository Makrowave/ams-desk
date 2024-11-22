"use client";
import Modal from "@/components/modals/modal";
import Navigation from "@/components/navigation/navigation";
import SideBar from "@/components/navigation/side_bar";
import AdminRoute from "@/components/routing/admin_route";
import PrivateRoute from "@/components/routing/private_route";
import FitlerModelTable from "@/components/table/model_table/filter_model_table";

export default function BikesPanel() {
  return (
    <AdminRoute>
      <Navigation active={3} />
      <main className='max-h-screen overflow-hidden'>
        <SideBar baseUrl={"/admin"} active={1}></SideBar>
        <FitlerModelTable />
        <Modal />
      </main>
    </AdminRoute>
  );
}
