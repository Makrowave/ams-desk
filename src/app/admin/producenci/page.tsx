'use client';
import { useManufacturersQuery } from '../../../hooks/queryHooks';
import AdminTable from '../../../components/table/AdminTable';
import URLS from '../../../util/urls';
import { Manufacturer } from '../../../types/filterTypes';

function CategoriesPanel() {
  const { data, isLoading, isError } = useManufacturersQuery<Manufacturer[]>();
  const newRowFormat = [
    { key: '', label: 'Id', input: 'blank' },
    { key: 'manufacturerName', label: 'Nazwa', input: 'text' },
  ];
  return (
    <div>
      {!isError && !isLoading && (
        <AdminTable
          data={data}
          url={URLS.Manufacturers}
          newRowFormat={newRowFormat}
        />
      )}
    </div>
  );
}

export default CategoriesPanel;
