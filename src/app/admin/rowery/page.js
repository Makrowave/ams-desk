"use client";
import Modal from "@/components/modals/Modal";
import Navigation from "@/components/navigation/Navigation";
import SideBar from "@/components/navigation/SideBar";
import AdminRoute from "@/components/routing/AdminRoute";
import PrivateRoute from "@/components/routing/PrivateRoute";
import FitlerModelTable from "@/components/table/model_table/FilterModelTable";

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
