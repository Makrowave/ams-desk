'use client';
import { useCategoriesQuery } from '../../../hooks/queryHooks';
import AdminTable from '../../../components/table/AdminTable';
import URLS from '../../../util/urls';
import { Category } from '../../../types/filterTypes';
import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

function CategoriesPanel() {
  const { data, isLoading, isError } = useCategoriesQuery<Category[]>();

  const columns = useMemo<MRT_ColumnDef<Category>[]>(() => {
    return [
      {
        accessorKey: 'name',
        header: 'Nazwa',
      },
    ];
  }, []);

  return <AdminTable data={data} url={URLS.Categories} columns={columns} />;
}

export default CategoriesPanel;
