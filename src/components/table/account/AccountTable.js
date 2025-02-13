"use client";
import "../table.css";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/util/query_keys";
import AccountRow from "./AccountRow";
import useEmployeesQuery from "@/hooks/queries/useEmployeesQuery";
import useAxiosAdmin from "@/hooks/useAxiosAdmin";
export default function AccountTable() {
  const axiosAdmin = useAxiosAdmin();
  const _url = "/Users";
  const { data, isPending, isError, error } = useQuery({
    queryKey: [QUERY_KEYS.Users],
    queryFn: async () => {
      const response = await axiosAdmin.get(_url);
      return response.data;
    },
    refetchInterval: 5000,
  });
  const employees = useEmployeesQuery();
  return (
    <table className='table w-full'>
      <thead className='bg-secondary mb-px sticky top-0 z-10 shadow-lg h-10'>
        <tr>
          <th className='w-20'>Id</th>
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
            const employeeName = employees.data.find((e) => e.employeeId === user.employeeId)?.employeeName;
            return <AccountRow user={user} key={user.userId} employeeName={employeeName ? employeeName : "Brak"} />;
          })}
      </tbody>
    </table>
  );
}
