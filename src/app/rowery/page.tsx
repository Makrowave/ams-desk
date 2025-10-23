'use client';
import Navigation from '../../components/navigation/Navigation';
import PrivateRoute from '../../components/routing/PrivateRoute';
import FilterModelTable from '../../components/table/modelTable/FilterModelTable';

function Rowery() {
  return (
    <PrivateRoute>
      <Navigation />
      <main>
        <FilterModelTable />
      </main>
    </PrivateRoute>
  );
}

export default Rowery;
