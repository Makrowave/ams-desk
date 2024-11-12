"use client";
import StatusRow from "./status_row";
import "../table.css";
import useAxiosPrivate from "@/hooks/use_axios_private";
import { useQuery } from "@tanstack/react-query";
export default function StatusTable() {
  //const data = [{ id: 1, name: "Niezłożony", hexCode: "#fff0c2" }];
  const axiosPrivate = useAxiosPrivate();
  const _queryKey = "status";
  const _url = "/Status";
  const { data, isPending, isError, error } = useQuery({
    queryKey: [_queryKey],
    queryFn: async () => {
      const response = await axiosPrivate.get(_url);
      return response.data;
    },
  });
  return (
    <table className='table w-full'>
      <thead className='bg-secondary mb-px sticky top-0 z-5 shadow-lg h-10'>
        <tr>
          <th className='w-20'>Id</th>
          <th className='w-14'></th>
          <th>Nazwa</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>{!isPending && !isError && data.map((status) => <StatusRow status={status} />)}</tbody>
    </table>
  );
}
