"use client";
import PrivateRoute from "@/components/routing/PrivateRoute";
import Navigation from "@/components/navigation/Navigation";
import RepairTable from "@/components/repairs/RepairTable";
import {REPAIR_STATUS} from "@/util/repairStatuses";
import SideBar from "@/components/navigation/SideBar";
import {repairsNavigation} from "@/app/serwis/page";

export default function CollectedRepairsPage() {
  return (
    <PrivateRoute>
      <Navigation active={2}/>
      <main className='overflow-y-hidden'>
        <SideBar baseUrl={"/serwis"} links={repairsNavigation}/>
        <div className='flex flex-col m-auto overflow-y-auto h-full px-12 py-6 items-center space-y-10'>
          <div className='bg-white rounded-xl p-8'>
            <h2 className='mb-4 text-2xl'>Wydane</h2>
            <RepairTable src={createTableSrc(collected)} localKey='collected'/>
          </div>
        </div>
      </main>
    </PrivateRoute>
  );
}

const createTableSrc = (excluded) => {
  const result = excluded.reduce((src, exclude) => src + "excluded=" + exclude + "&", "/Repairs?");
  return result.slice(0, result.length - 1);
};

const collected = [
  REPAIR_STATUS.Pending,
  REPAIR_STATUS.Warranty,
  REPAIR_STATUS.InProgress,
  REPAIR_STATUS.AwaitingParts,
  REPAIR_STATUS.Finished,
  REPAIR_STATUS.Notified,
  REPAIR_STATUS.ContactNeeded
];

