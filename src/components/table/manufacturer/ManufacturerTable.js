"use client";
import "../table.css";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import ManufacturerRow from "./ManufacturerRow";
import { QUERY_KEYS } from "@/util/query_keys";
export default function ManufacturerTable() {
  const axiosPrivate = useAxiosPrivate();
  const _url = "/Manufacturers";
  const { data, isPending, isError, error } = useQuery({
    queryKey: [QUERY_KEYS.Manufacturers],
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
          data.map((manufacturer, index) => (
            <ManufacturerRow
              manufacturer={manufacturer}
              key={manufacturer.manufacturerId}
              prev={data[index - 1]?.manufacturerId}
              next={data[index + 1]?.manufacturerId}
            />
          ))}
      </tbody>
    </table>
  );
}
