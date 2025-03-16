'use client'
import {useQuery} from "@tanstack/react-query";
import {QUERY_KEYS} from "@/util/query_keys";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import FavoriteModelRecord from "@/components/table/favorite/FavoriteModelRecord";

export default function FavoritesTable() {

  const axiosPrivate = useAxiosPrivate()
  const {data, isLoading, isError, error} = useQuery({
    queryKey: [QUERY_KEYS.Favorites],
    queryFn: async () => {
      const result = await axiosPrivate({url: "/models/favorite"});
      return result.data;
    }
  });

  return (
    <table className="w-fit mr-auto min-w-[600px]">
      <thead className="sticky top-0 shadow-lg">
      <tr className="*:bg-secondary *:p-2">
        <th className="rounded-tl-lg"></th>
        <th>Nazwa</th>
        <th>Rozmiar</th>
        <th>Producent</th>
        <th>Kod</th>
        <th className="rounded-tr-lg">Ilość</th>
      </tr>
      </thead>
      <tbody>
      {!isError && !isLoading && data.map(model => <FavoriteModelRecord key={model.modelId} model={model}/>)}
      </tbody>
    </table>
  )
}