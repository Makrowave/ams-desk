'use client';
import PrivateRoute from '../../../components/routing/PrivateRoute';
import RepairTable from '../../../components/repairs/RepairTable';
import SideBar from '../../../components/navigation/SideBar';
import { repairsRoutes } from '../../../components/routing/routes';
import { collected, createTableSrc } from '../../../util/repairsHelper';
import Navigation from '../../../components/navigation/Navigation';

function CollectedRepairsPage() {
  return (
    <PrivateRoute>
      <Navigation />
      <main className="overflow-y-hidden">
        <SideBar baseUrl={'/serwis'} links={repairsRoutes} />
        <div className="flex flex-col m-auto overflow-y-auto h-full px-12 py-6 items-center space-y-10">
          <div className="bg-white rounded-xl p-8">
            <h2 className="mb-4 text-2xl">Wydane</h2>
            <RepairTable src={createTableSrc(collected)} localKey="collected" />
          </div>
        </div>
      </main>
    </PrivateRoute>
  );
}

export default CollectedRepairsPage;
