'use client';
import { useEmployeesQuery, useUsersQuery } from '../../../hooks/queryHooks';
import { Employee, User } from '../../../types/employeeTypes';
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_TableOptions,
} from 'material-react-table';
import { useMemo } from 'react';
import useLocallyStoredTable from '../../../hooks/useLocallyStoredTable';
import MaterialModal from '../../modals/MaterialModal';
import { Box, Button, MenuItem } from '@mui/material';
import UserModal from '../../modals/admin/UserModal';
import LogoutModal from '../../modals/admin/LogoutModal';
import DeleteModal from '../../modals/DeleteModal';
import URLS from '../../../util/urls';
import { paperTableStyle } from '../../../styles/styles';

const AccountTable = () => {
  const { data, isPending, isError, error } = useUsersQuery<User[]>(null, {
    refetchInterval: 5000,
  });
  const employees = useEmployeesQuery<Employee[]>();

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
      },
      {
        accessorKey: 'username',
        header: 'Nazwa użytkownika',
      },
      {
        accessorKey: 'employeeId',
        header: 'Pracownik',
        Cell: ({ row }) => {
          const employee = employees.data?.find(
            (e) => e.id === row.original.employeeId,
          );
          return employee ? employee.name : 'Brak';
        },
      },
    ],
    [employees.data],
  );

  const tableDef: MRT_TableOptions<User> = {
    ...paperTableStyle,
    columns,
    data: data || [],
    enableRowActions: true,
    renderRowActionMenuItems: ({ row }) => [
      <MaterialModal
        label={'Edytuj konto'}
        button={<MenuItem>Edytuj</MenuItem>}
      >
        <UserModal user={row.original} action={'put'} />
      </MaterialModal>,
      <MaterialModal label={'Wyloguj'} button={<MenuItem>Wyloguj</MenuItem>}>
        <LogoutModal id={row.original.id} />
      </MaterialModal>,
      <MaterialModal label={'Usuń konto'} button={<MenuItem>Usuń</MenuItem>}>
        <DeleteModal
          id={row.original.id}
          refetchQueryKey={URLS.Users}
          admin={true}
          url={URLS.Users}
        />
      </MaterialModal>,
    ],
    renderTopToolbarCustomActions: () => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
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
      </Box>
    ),
  };

  const { table } = useLocallyStoredTable('accounts', tableDef);

  return <MaterialReactTable table={table} />;
};

export default AccountTable;
