'use client';
import { useColorsQuery } from '../../../hooks/queryHooks';
import AdminTable from '../../../components/table/AdminTable';
import URLS from '../../../util/urls';
import { Color } from '../../../types/filterTypes';
import { useMemo, useState } from 'react';
import { MRT_ColumnDef } from 'material-react-table';
import { Box } from '@mui/material';
import ColorInput from '../../../components/input/ColorInput';
import ColorEditTableCell from '../../../components/table/ColorEditTableCell';
import ColorCell from '../../../components/table/ColorCell';

function ColorsPanel() {
  const { data, isLoading, isError } = useColorsQuery<Color[]>();

  const columns = useMemo<MRT_ColumnDef<Color>[]>(
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

  return <AdminTable columns={columns} data={data} url={URLS.Colors} />;
}

export default ColorsPanel;
