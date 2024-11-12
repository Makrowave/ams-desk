"use client";
import CategoryRow from "./category_row";
import "../table.css";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/use_axios_private";
export default function CategoryTable() {
  const axiosPrivate = useAxiosPrivate();
  const _queryKey = "categories";
  const _url = "/Categories";
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
          <th>Nazwa</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>{!isPending && !isError && data.map((category) => <CategoryRow category={category} />)}</tbody>
    </table>
  );
}
