'use client';
import { useState } from 'react';
import { useServicesQuery } from '../../../hooks/queryHooks';
import URLS, { URLKEYS } from '../../../util/urls';
import AdminTable from '../../../components/table/AdminTable';
import { Box } from '@mui/material';
import { Service } from '../../types/repairTypes';

const AdminRepairs = () => {
  const {
    isError: isServicesError,
    isLoading: isServicesLoading,
    data: servicesData,
    error: servicesError,
  } = useServicesQuery<Service[]>();

  const [serviceCategory, setServiceCategory] = useState(0);
  const [serviceName, setServiceName] = useState('');

  const filteredServices =
    servicesData === undefined
      ? []
      : servicesData.filter((service) => {
          return (
            (service.name.toLowerCase().includes(serviceName.toLowerCase()) ||
              serviceName === '') &&
            (service.serviceCategoryId === serviceCategory ||
              serviceCategory === 0)
          );
        });

  const newRowFormat = [
    { key: '', label: '', input: 'blank' },
    { key: 'serviceName', label: 'Nazwa', input: 'text' },
    { key: 'price', label: 'Cena', input: 'text' },
    {
      key: 'serviceCategoryId',
      label: 'Kategoria',
      input: 'picker',
      default: '',
      pickerData: {
        urlKey: URLKEYS.ServiceCategories,
        params: {},
        idKey: 'id',
        valueKey: 'name',
      },
    },
  ];

  return (
    <Box>
      {!isServicesError && !isServicesLoading && (
        <AdminTable
          data={filteredServices}
          url={URLS.Services}
          noReorder
          newRowFormat={newRowFormat}
        />
      )}
    </Box>
  );
};

export default AdminRepairs;
