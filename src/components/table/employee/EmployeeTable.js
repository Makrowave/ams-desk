"use client";
import EmployeeRow from "./EmployeeRow";
import "../table.css";
import {useEmployeesQuery} from "@/hooks/queryHooks";

export default function EmployeeTable() {
  const {data, isPending, isError, error} = useEmployeesQuery(null, {refetchInterval: 5000})
  return (
    <table className='table w-full'>
      <thead className='bg-secondary mb-px sticky top-0 z-10 shadow-lg h-10'>
      <tr>
        <th className='w-20'>Id</th>
        <th>Nazwa</th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      {!isPending &&
        !isError &&
        data.map((employee, index) => (
          <EmployeeRow
            employee={employee}
            key={employee.employeeId}
            prev={data[index - 1]?.employeeId}
            next={data[index + 1]?.employeeId}
          />
        ))}
      </tbody>
    </table>
  );
}
