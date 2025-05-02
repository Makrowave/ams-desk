"use client";
import StatusRow from "./StatusRow";
import "../table.css";
import {useStatusesQuery} from "@/hooks/queryHooks";

export default function StatusTable() {
  const {data, isPending, isError, error} = useStatusesQuery(null, {refetchInterval: 5000})
  return (
    <table className='table w-full'>
      <thead className='bg-secondary mb-px sticky top-0 z-10 shadow-lg h-10'>
      <tr>
        <th className='w-20'>Id</th>
        <th className='w-14'></th>
        <th>Nazwa</th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      {!isPending &&
        !isError &&
        data.map((status, index) => (
          <StatusRow
            status={status}
            key={status.statusId}
            prev={data[index - 1]?.statusId}
            next={data[index + 1]?.statusId}
          />
        ))}
      </tbody>
    </table>
  );
}
