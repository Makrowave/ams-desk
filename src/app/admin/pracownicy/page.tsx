'use client';
import LogoutModal from '../../../components/modals/admin/LogoutModal';
import UserModal from '../../../components/modals/admin/UserModal';
import AccountTable from '../../../components/table/account/AccountTable';
import AdminTable from '../../../components/table/AdminTable';
import { useEmployeesQuery } from '../../../hooks/queryHooks';
import URLS from '../../../util/urls';
import MaterialModal from '../../../components/modals/MaterialModal';
import { Button } from '@mui/material';
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
    <>
      <div className="flex-row main-div bg-primary px-16 py-4">
        <AdminTable
          data={employeeData}
          url={URLS.Employees}
          columns={employeeColumns}
        />
        <div className="w-7/12 min-w-[600px] ml-auto">
          <h2 className="text-3xl">Konta</h2>
          <div className="overflow-y-auto max-h-[600px] w-full">
            <AccountTable />
          </div>
          <div className="mt-4 flex gap-2">
            <MaterialModal
              label={'Utwórz konto'}
              button={
                <Button variant={'contained'} color={'primary'}>
                  Dodaj
                </Button>
              }
            >
              <UserModal action="post" />
            </MaterialModal>
            <MaterialModal
              label={'Wyloguj wszystkich'}
              button={
                <Button variant={'contained'} color={'error'}>
                  Wyloguj wszystkich
                </Button>
              }
            >
              <LogoutModal />
            </MaterialModal>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeesPanel;
