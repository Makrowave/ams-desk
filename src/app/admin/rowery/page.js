"use client";
import Modal from "@/components/modals/Modal";
import Navigation from "@/components/navigation/Navigation";
import SideBar from "@/components/navigation/SideBar";
import AdminRoute from "@/components/routing/AdminRoute";
import FitlerModelTable from "@/components/table/model_table/FilterModelTable";

export default function BikesPanel() {
  return (
    <>
      <FitlerModelTable />
      <Modal />
    </>
  );
}
