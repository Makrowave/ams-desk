"use client";
import Navigation from "../../components/navigation/Navigation";
import Modal from "@/components/modals/Modal";
import PrivateRoute from "@/components/routing/PrivateRoute";
import FilterModelTable from "@/components/table/model_table/FilterModelTable";

export default function Rowery() {
  return (
    //overflow auto main
    <PrivateRoute>
      <Navigation active={1}/>
      <main>
        {/* <main className='max-h-screen overflow-hidden'> */}
        <FilterModelTable/>
      </main>
      <Modal/>
    </PrivateRoute>
  );
}
