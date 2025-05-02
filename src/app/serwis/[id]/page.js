"use client";
import Navigation from "@/components/navigation/Navigation";
import Repair from "@/components/repairs/Repair";
import PrivateRoute from "@/components/routing/PrivateRoute";
import {useRepairsQuery} from "@/hooks/queryHooks";

export default function RepairPage({params}) {
  const {id} = params;
  const {data, isPending, isError, error} = useRepairsQuery({id: id})

  return (
    <PrivateRoute>
      <Navigation active={2}/>
      <main className='h-[calc(100vh - 48px)] overflow-y-auto'>
        <div className='w-full h-full'>
          <div className='main-div bg-gray-200 px-12 py-6 h-fit'>
            {!(isPending || isError) && <Repair repair={data}/>}
          </div>
        </div>
      </main>
    </PrivateRoute>
  );
}
