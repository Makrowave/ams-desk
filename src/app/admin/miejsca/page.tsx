'use client';
import { usePlacesQuery } from '../../../hooks/queryHooks';
import AdminTable from '../../../components/table/AdminTable';
import URLS from '../../../util/urls';
import { Place } from '../../../types/filterTypes';
import { useMemo } from 'react';
import { MRT_ColumnDef } from 'material-react-table';
import { Checkbox } from '@mui/material';
import { Check, Close } from '@mui/icons-material';

function PlacesPanel() {
  const { data, isLoading, isError } = usePlacesQuery<Place[]>();

  const columns = useMemo<MRT_ColumnDef<Place>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Miejsce',
      },
      {
        accessorKey: 'isStorage',
        header: 'Magazyn',
        Cell: ({ cell }) =>
          cell.getValue<boolean>() ? (
            <Check color={'success'} />
          ) : (
            <Close color="error" />
          ),
        Edit: ({ cell, row, column }) => (
          <Checkbox
            value={Boolean(cell.getValue())}
            onChange={() => {
              row._valuesCache[column.id] = !row._valuesCache[column.id];
            }}
          />
        ),
      },
    ],
    [],
  );

  return <AdminTable data={data} url={URLS.Places} columns={columns} />;
}

export default PlacesPanel;
