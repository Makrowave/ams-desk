'use client';
import Navigation from '../../../components/navigation/Navigation';
import RepairDisplay from '../../../components/repairs/RepairDisplay';
import PrivateRoute from '../../../components/routing/PrivateRoute';
import { useRepairsQuery } from '../../../hooks/queryHooks';
import { Repair } from '../../../types/repairTypes';

function RepairPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data, isPending, isError, error } = useRepairsQuery<Repair>({
    id: Number(id),
  });

  return (
    <PrivateRoute>
      <Navigation />
      <main className="h-[calc(100vh - 48px)] overflow-y-auto">
        <div className="w-full h-full">
          <div className="main-div bg-gray-200 px-12 py-6 h-fit">
            {!(isPending || isError) && <RepairDisplay repair={data} />}
          </div>
        </div>
      </main>
    </PrivateRoute>
  );
}

export default RepairPage;
