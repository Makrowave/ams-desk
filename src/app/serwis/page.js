"use client";
import PrivateRoute from "@/components/routing/PrivateRoute";
import Navigation from "../../components/navigation/Navigation";
import RepairTable from "@/components/repairs/RepairTable";
import Modal from "@/components/modals/Modal";
import { REPAIR_STATUS } from "@/util/repairStatuses";

export default function Serwis() {
  return (
    <PrivateRoute>
      <Navigation active={2} />
      <main className='overflow-y-hidden'>
        <div className='main-div px-12 py-6 flex-row items-start justify-center space-x-10'>
          <div className='bg-white rounded-xl p-8 w-fit'>
            <h2 className='mb-4 text-2xl'>W trakcie</h2>
            <RepairTable src={createTableSrc(inProgress)} addButton localKey='inProgress' />
          </div>
          <div className='flex-col space-y-10'>
            <div className='bg-white rounded-xl p-8 w-fit max-h-1/2'>
              <h2 className='mb-4 text-2xl'>Ukończone</h2>
              <RepairTable src={createTableSrc(finished)} localKey='finished' />
            </div>
            <div className='bg-white rounded-xl p-8 w-fit max-h-1/2'>
              <h2 className='mb-4 text-2xl'>Wydane</h2>
              <RepairTable src={createTableSrc(collected)} localKey='collected' />
            </div>
          </div>
        </div>
      </main>
      <Modal />
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
  REPAIR_STATUS.ContactNeeded,
];

const finished = [
  REPAIR_STATUS.Pending,
  REPAIR_STATUS.Warranty,
  REPAIR_STATUS.InProgress,
  REPAIR_STATUS.AwaitingParts,
  REPAIR_STATUS.Collected,
  REPAIR_STATUS.ContactNeeded,
];

const inProgress = [REPAIR_STATUS.Collected, REPAIR_STATUS.Finished, REPAIR_STATUS.Notified];
