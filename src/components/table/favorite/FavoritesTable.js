'use client';
import FavoriteModelRecord from '@/components/table/favorite/FavoriteModelRecord';
import { useFavoritesQuery } from '@/hooks/queryHooks';

export default function FavoritesTable() {
  const { data, isLoading, isError, error } = useFavoritesQuery(null, {
    refetchInterval: 5000,
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
        {!isError &&
          !isLoading &&
          data?.map((model) => (
            <FavoriteModelRecord key={model.modelId} model={model} />
          ))}
      </tbody>
    </table>
  );
}
