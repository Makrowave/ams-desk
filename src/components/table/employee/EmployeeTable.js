"use client";
import EmployeeRow from "./EmployeeRow";
import "../table.css";
import {useQuery} from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import {QUERY_KEYS} from "@/util/query_keys";

export default function EmployeeTable() {
  const axiosPrivate = useAxiosPrivate();
  const _url = "/Employees";
  const {data, isPending, isError, error} = useQuery({
    queryKey: [QUERY_KEYS.Employees],
    queryFn: async () => {
      const response = await axiosPrivate.get(_url);
      return response.data;
    },
    refetchInterval: 5000,
  });
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
