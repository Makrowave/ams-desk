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

function EmployeesPanel() {
  const {
    data: employeeData,
    error: isEmployeeError,
    isLoading: isEmployeeLoading,
  } = useEmployeesQuery<Employee[]>();
  const employeeRowFormat = [
    { key: '', label: 'Id', input: 'blank' },
    { key: 'employeeName', label: 'Pracownik', input: 'text' },
  ];
  const employeeHeaders = ['Id', 'Pracownik'];
  return (
    <>
      <div className="flex-row main-div bg-primary px-16 py-4">
        {!isEmployeeLoading && !isEmployeeError && (
          <AdminTable
            newRowFormat={employeeRowFormat}
            data={employeeData}
            url={URLS.Employees}
          />
        )}
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
