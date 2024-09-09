"use client";
import { useQuery } from '@tanstack/react-query';
import BikeRecord from './bike_record';

export default function TableHeader(placeCount) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['headerStatuses'],
    queryFn: async () => {
      const response = await fetch('https://localhost:7077/api/Places');
      if (!response.ok) {
        throw new Error('Header status fetch failed!');
      }
      return response.json();
    }
  })

  function TableHeaderWrapper({children}) {
    return (
      <thead className='bg-slate-300 border-2 border-slate-300 mb-px'>
        <tr>
          <th className='w-96 pl-8'>Rower</th>
          <th className='w-24'>Rozmiar</th>
          <th className='w-24'>Koła</th>
          <th className='w-24'>Cena</th>
          <th className='w-24'>Ilość</th>
          {children}
        </tr>
      </thead>
    );
  }


  if (isPending) {
    return <TableHeaderWrapper><th>Loading...</th></TableHeaderWrapper>;
  }

  if (isError) {
    return <TableHeaderWrapper><th>{error.message}</th></TableHeaderWrapper>;
  }

  let p_data =
    data
      .sort((a, b) => a.placeId - b.placeId)
      .map((place) => (<th className='w-24' key={place.placeId}>{place.placeName}</th>))

  return (
    <TableHeaderWrapper>{p_data}</TableHeaderWrapper>
  );
}