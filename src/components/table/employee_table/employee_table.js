"use client";
import EmployeeRow from "./employee_row";
import "../table.css";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/use_axios_private";
export default function EmployeeTable() {
  const axiosPrivate = useAxiosPrivate();
  // const _queryKey = "employees";
  // const _url = "/Employees";
  // const { data, isPending, isError, error } = useQuery({
  //   queryKey: [_queryKey],
  //   queryFn: async () => {
  //     const response = await axiosPrivate.get(_url);
  //     return response.data;
  //   },
  // });
  const data = [{ employeeId: 1, employeeName: "Maks S.", isAdmin: true }];
  return (
    <table className='table w-full'>
      <thead className='bg-secondary mb-px sticky top-0 z-5 shadow-lg h-10'>
        <tr>
          <th className='w-20'>Id</th>
          <th>Nazwa</th>
          <th className='w-fit'>Administrator</th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((employee) => (
          <EmployeeRow employee={employee} />
        ))}
      </tbody>
    </table>
  );
}
