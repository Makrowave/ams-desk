"use client";
import CategoryRow from "./wheel_row";
import "../table.css";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/use_axios_private";
import { QUERY_KEYS } from "@/util/query_keys";
export default function WheelTable() {
  const axiosPrivate = useAxiosPrivate();
  const _url = "/WheelSizes";
  const { data, isPending, isError, error } = useQuery({
    queryKey: [QUERY_KEYS.WheelSizes],
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
          <th className='w-20'>Rozmiar</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{!isPending && !isError && data.map((wheel) => <CategoryRow wheel={wheel} key={wheel} />)}</tbody>
    </table>
  );
}
