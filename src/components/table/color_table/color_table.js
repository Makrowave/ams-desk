"use client";
import ColorRow from "./color_row";
import "../table.css";
import useAxiosPrivate from "@/hooks/use_axios_private";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/util/query_keys";
export default function ColorTable() {
  //const data = [{ id: 1, name: "Czrewony", hexCode: "#FF0000" }];
  const axiosPrivate = useAxiosPrivate();
  const _url = "/Colors";
  const { data, isPending, isError, error } = useQuery({
    queryKey: [QUERY_KEYS.Colors],
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
          <th className='w-14'></th>
          <th>Nazwa</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>{!isPending && !isError && data.map((color) => <ColorRow color={color} key={color.colorId} />)}</tbody>
    </table>
  );
}
