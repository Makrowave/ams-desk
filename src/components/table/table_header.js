"use client";
import { useQuery } from '@tanstack/react-query';

export default function TableHeader({ singlePlace }) {

  function TableHeaderWrapper({ children }) {
    return (
      <thead className='bg-secondary mb-px sticky top-0 z-5 shadow-lg h-10'>
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
    { placeId: 1, placeName: 'Wojc', color: 'bg-shop1' },
    { placeId: 2, placeName: 'Gala', color: 'bg-shop2' },
    { placeId: 3, placeName: 'Gęsia', color: 'bg-shop3' },
    { placeId: 4, placeName: 'Mag A', color: '' },
    { placeId: 5, placeName: 'Mag B', color: '' },
    { placeId: 6, placeName: 'Mag D', color: '' },
  ]

  let p_data =
    data
      .sort((a, b) => a.placeId - b.placeId)
      .map((place) => (<th className={'w-24 ' + place.color} key={place.placeId}>{place.placeName}</th>))

  return (
    <TableHeaderWrapper>
      {!singlePlace && p_data}
    </TableHeaderWrapper>
  )

}