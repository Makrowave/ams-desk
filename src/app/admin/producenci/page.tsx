'use client';
import { useManufacturersQuery } from '../../../hooks/queryHooks';
import AdminTable from '../../../components/table/AdminTable';
import URLS from '../../../util/urls';
import { Manufacturer } from '../../../types/filterTypes';
import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

function CategoriesPanel() {
  const { data, isLoading, isError } = useManufacturersQuery<Manufacturer[]>();
  const columns = useMemo<MRT_ColumnDef<Manufacturer>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Nazwa',
      },
    ],
    [],
  );
  return <AdminTable data={data} url={URLS.Manufacturers} columns={columns} />;
}

export default CategoriesPanel;
