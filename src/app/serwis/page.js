"use client";
import PrivateRoute from "@/components/routing/PrivateRoute";
import Navigation from "../../components/navigation/Navigation";
import RepairTable from "@/components/repairs/RepairTable";
import {REPAIR_STATUS} from "@/util/repairStatuses";
import SideBar from "@/components/navigation/SideBar";
import {FaFlagCheckered, FaHourglassHalf, FaScrewdriverWrench} from "react-icons/fa6";
import {FaArchive} from "react-icons/fa";

export default function RepairsPage() {
  return (
    <PrivateRoute>
      <Navigation active={2}/>
      <main className='overflow-y-hidden'>
        <SideBar baseUrl={"/serwis"} links={repairsNavigation}/>
        <div
          className='flex flex-col m-auto overflow-y-auto h-full px-12 py-6 items-center space-y-10'>
          <div className='bg-white rounded-xl p-8'>
            <h2 className='mb-4 text-2xl'>W trakcie</h2>
            <RepairTable src={createTableSrc(inProgress)} addButton localKey='inProgress'/>
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


const inProgress = [REPAIR_STATUS.Collected, REPAIR_STATUS.Finished, REPAIR_STATUS.Notified, REPAIR_STATUS.Cancelled];

export const repairsNavigation = [
  {url: "", icon: <FaHourglassHalf/>, title: "W trakcie"},
  {url: "/ukonczone", icon: <FaFlagCheckered/>, title: "Ukończone"},
  {url: "/wydane", icon: <FaArchive/>, title: "Wydane"},
  {url: "/czesci", icon: <FaScrewdriverWrench/>, title: "Części"},
]