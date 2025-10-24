'use client';
import PrivateRoute from '../../components/routing/PrivateRoute';
import FilterModelTable from '../../components/table/modelTable/FilterModelTable';

function Rowery() {
  return (
    <PrivateRoute>
      <FilterModelTable />
    </PrivateRoute>
  );
}

export default Rowery;
