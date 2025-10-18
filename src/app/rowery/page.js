'use client';
import Navigation from '../../components/navigation/Navigation';
import PrivateRoute from '@/components/routing/PrivateRoute';
import FilterModelTable from '@/components/table/modelTable/FilterModelTable';

export default function Rowery() {
  return (
    //overflow auto main
    <PrivateRoute>
      <Navigation active={1} />
      <main>
        <FilterModelTable />
      </main>
    </PrivateRoute>
  );
}
