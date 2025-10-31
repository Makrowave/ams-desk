'use client';
import { useStatusesQuery } from '../../../hooks/queryHooks';
import AdminTable from '../../../components/table/AdminTable';
import URLS from '../../../util/urls';
import { Status } from '../../../types/filterTypes';
import { useMemo } from 'react';
import { MRT_ColumnDef } from 'material-react-table';
import ColorCell from '../../../components/table/ColorCell';
import ColorEditTableCell from '../../../components/table/ColorEditTableCell';

function StatusPanel() {
  const { data, isLoading, isError } = useStatusesQuery<Status[]>();

  const columns = useMemo<MRT_ColumnDef<Status>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Nazwa',
      },
      {
        accessorKey: 'color',
        id: 'color',
        header: 'Kolor',
        Cell: ColorCell,
        Edit: ColorEditTableCell,
      },
    ],
    [],
  );
  return (
    <AdminTable
      columns={columns}
      data={data}
      url={URLS.Statuses}
      noDelete
      noAdd
    />
  );
}

export default StatusPanel;
