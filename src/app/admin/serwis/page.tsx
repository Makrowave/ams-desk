'use client';
import { useMemo, useState } from 'react';
import {
  useServiceCategoriesQuery,
  useServicesQuery,
} from '../../../hooks/queryHooks';
import URLS, { URLKEYS } from '../../../util/urls';
import AdminTable from '../../../components/table/AdminTable';
import { Box } from '@mui/material';
import { Service, ServiceCategory } from '../../../types/repairTypes';
import { MRT_ColumnDef } from 'material-react-table';

function AdminRepairs() {
  const {
    isError: isServicesError,
    isLoading: isServicesLoading,
    data: servicesData,
    error: servicesError,
  } = useServicesQuery<Service[]>();

  const {
    data: serviceCategoriesData,
    isLoading: isServiceCategoriesLoading,
    isError: isServiceCategoriesError,
  } = useServiceCategoriesQuery<ServiceCategory[]>();

  const columns: MRT_ColumnDef<Service>[] = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Nazwa',
      },
      {
        accessorKey: 'price',
        header: 'Cena',
      },
      {
        id: 'serviceCategoryId',
        accessorKey: 'serviceCategoryId',
        accessorFn: (row) => {
          return (
            serviceCategoriesData?.find(
              (category) => category.id === row.serviceCategoryId,
            )?.name || 'Brak'
          );
        },
        header: 'Kategoria',
        editVariant: 'select',
        editSelectOptions: serviceCategoriesData?.map((category) => ({
          value: category.id,
          label: category.name,
        })),
      },
    ],
    [serviceCategoriesData],
  );

  return (
    <AdminTable
      data={servicesData}
      url={URLS.Services}
      noReorder
      columns={columns}
    />
  );
}

export default AdminRepairs;
