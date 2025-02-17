"use client";
import PrivateRoute from "@/components/routing/PrivateRoute";
import Navigation from "../../components/navigation/Navigation";
import RepairTable from "@/components/repairs/RepairTable";
import Modal from "@/components/modals/Modal";

export default function Serwis() {
  return (
    <PrivateRoute>
      <Navigation active={2} />
      <main>
        <div className='main-div px-12 py-6 flex-row items-start justify-center space-x-10'>
          <div className=' bg-white rounded-xl p-8 w-fit'>
            <h2 className='mb-4 text-2xl'>W trakcie</h2>
            {/*For excluded statuses check seeding at the bottom of onModelCreation of BikesDbContext in backend*/}
            <RepairTable src='/Repairs?excluded=5&excluded=6' addButton />
          </div>
          <div className='flex-col space-y-10'>
            <div className=' bg-white rounded-xl p-8 w-fit max-h-1/2'>
              <h2 className='mb-4 text-2xl'>Ukończone</h2>
              <RepairTable src='/Repairs?excluded=1&excluded=2&excluded=3&excluded=4&excluded=6' />
            </div>
            <div className=' bg-white rounded-xl p-8 w-fit max-h-1/2'>
              <h2 className='mb-4 text-2xl'>Wydane</h2>
              <RepairTable src='/Repairs?excluded=1&excluded=2&excluded=3&excluded=4&excluded=5' />
            </div>
          </div>
        </div>
      </main>
      <Modal />
    </PrivateRoute>
  );
}
