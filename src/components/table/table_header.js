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

  const thead_body = (places) => {
    return (
      <thead>
        <tr>
          <th>Rower</th>
          <th>Rozmiar</th>
          <th>Koła</th>
          <th>Cena</th>
          <th>Ilość</th>
          {places}
        </tr>
      </thead>
    );
  }


  if (isPending) {
    return thead_body(<th>Loading...</th>);
  }

  if (isError) {
    return thead_body(<th>{error.message}</th>);
  }

  let p_data =
    data
      .sort((a, b) => a.placeId - b.placeId)
      .map((place) => (<th key={place.placeId}>{place.placeName}</th>))

  console.log(data);

  return (
    thead_body(p_data)
  );
}