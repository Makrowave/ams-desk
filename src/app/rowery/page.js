"use client";
import Navigation from "../../components/navigation/navigation";
import Modal from "@/components/modals/modal";
import PrivateRoute from "@/components/routing/private_route";
import FitlerModelTable from "@/components/table/model_table/filter_model_table";

export default function Rowery() {
  return (
    //overflow auto main
    <PrivateRoute>
      <Navigation active={1} />
      <main className='max-h-screen overflow-hidden'>
        <FitlerModelTable />
      </main>
      <Modal />
    </PrivateRoute>
  );
}
