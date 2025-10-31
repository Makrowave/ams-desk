'use client';
import AdminTable from '../../../components/table/AdminTable';
import URLS from '../../../util/urls';
import { useWheelSizesQuery } from '../../../hooks/queryHooks';
import { WheelSize } from '../../../types/filterTypes';
import { useMemo } from 'react';
import { MRT_ColumnDef } from 'material-react-table';

function CategoriesPanel() {
  const { data, isError, isLoading } = useWheelSizesQuery<WheelSize[]>();
  const newRowFormat = [{ key: 'wheelSize', label: 'Koło', input: 'text' }];

  const columns = useMemo<MRT_ColumnDef<WheelSize>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Rozmiar koła',
      },
    ],
    [],
  );

  return (
    <AdminTable
      data={data}
      url={URLS.WheelSizes}
      noEdit
      noReorder
      addAsQuery
      columns={columns}
    />
  );
}

export default CategoriesPanel;
