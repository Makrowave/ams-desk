'use client';
import AccountTable from '../../../components/table/account/AccountTable';
import AdminTable from '../../../components/table/AdminTable';
import { useEmployeesQuery } from '../../../hooks/queryHooks';
import URLS from '../../../util/urls';
import { Stack } from '@mui/material';
import { Employee } from '../../../types/employeeTypes';
import { useMemo } from 'react';
import { MRT_ColumnDef } from 'material-react-table';

function EmployeesPanel() {
  const {
    data: employeeData,
    error: isEmployeeError,
    isLoading: isEmployeeLoading,
  } = useEmployeesQuery<Employee[]>();
  const employeeColumns = useMemo<MRT_ColumnDef<Employee>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Pracownik',
      },
    ],
    [],
  );

  return (
    <Stack sx={{ gap: 4 }}>
      <AdminTable
        data={employeeData}
        url={URLS.Employees}
        columns={employeeColumns}
      />
      <AccountTable />
    </Stack>
  );
}

export default EmployeesPanel;
