"use client";
import { useQuery } from '@tanstack/react-query';

export default function TableHeader({ singlePlace }) {

  function TableHeaderWrapper({ children }) {
    return (
      <thead className='bg-tertiary mb-px sticky top-0 z-5'>
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

  const data = [
    { placeId: 1, placeName: 'Wojc' },
    { placeId: 2, placeName: 'Gala' },
    { placeId: 3, placeName: 'Gęsia' },
    { placeId: 4, placeName: 'Mag A' },
    { placeId: 5, placeName: 'Mag B' },
    { placeId: 6, placeName: 'Mag D' },
  ]

  let p_data =
    data
      .sort((a, b) => a.placeId - b.placeId)
      .map((place) => (<th className='w-24' key={place.placeId}>{place.placeName}</th>))

  return (
    <TableHeaderWrapper>
      {!singlePlace && p_data}
    </TableHeaderWrapper>
  )

}