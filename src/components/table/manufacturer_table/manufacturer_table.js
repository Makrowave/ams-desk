"use client";
import "../table.css";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/use_axios_private";
import ManufacturerRow from "./manufacturer_row";
export default function ManufacturerTable() {
  const axiosPrivate = useAxiosPrivate();
  const _queryKey = "manufacturers";
  const _url = "/Manufacturers";
  const { data, isPending, isError, error } = useQuery({
    queryKey: [_queryKey],
    queryFn: async () => {
      const response = await axiosPrivate.get(_url);
      return response.data;
    },
    refetchInterval: 5000,
  });
  return (
    <table className='table w-full'>
      <thead className='bg-secondary mb-px sticky top-0 z-5 shadow-lg h-10'>
        <tr>
          <th className='w-20'>Id</th>
          <th>Nazwa</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {!isPending &&
          !isError &&
          data.map((manufacturer) => <ManufacturerRow manufacturer={manufacturer} key={manufacturer.manufacturerId} />)}
      </tbody>
    </table>
  );
}
