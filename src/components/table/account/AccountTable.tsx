'use client';
import AccountRow from './AccountRow';
import { useEmployeesQuery, useUsersQuery } from '../../../hooks/queryHooks';
import { Employee, User } from '../../../types/employeeTypes';

const AccountTable = () => {
  const { data, isPending, isError, error } = useUsersQuery<User[]>(null, {
    refetchInterval: 5000,
  });
  const employees = useEmployeesQuery<Employee[]>();
  return (
    <table className="table w-full">
      <thead className="bg-secondary mb-px sticky top-0 z-10 shadow-lg h-10">
        <tr>
          <th className="w-20">Id</th>
          <th>Login</th>
          <th>Pracownik</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {!isPending &&
          !isError &&
          !employees.isPending &&
          !employees.isError &&
          data.map((user) => {
            const employeeName = employees.data.find(
              (e) => e.id === user.employeeId,
            )?.name;
            return (
              <AccountRow
                user={user}
                key={user.id}
                employeeName={employeeName ? employeeName : 'Brak'}
              />
            );
          })}
      </tbody>
    </table>
  );
};

export default AccountTable;
