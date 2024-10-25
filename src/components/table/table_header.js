"use client";

export default function TableHeader({ singlePlace }) {
  function TableHeaderWrapper({ children }) {
    return (
      <thead className='bg-secondary mb-px sticky top-0 z-5 shadow-lg h-10'>
        <tr>
          <th className='w-96 pl-8'>Rower</th>
          <th className='w-24'>Rozmiar</th>
          <th className='w-24'>Koła</th>
          <th className='w-24'>Cena</th>
          <th className='w-24 '>Ilość</th>
          {children}
        </tr>
      </thead>
    );
  }
  let data = JSON.parse(process.env.NEXT_PUBLIC_PLACES)
    .sort((a, b) => a.placeId - b.placeId)
    .map((place) => {
      let tempClass = `w-24 ${place.color}`;
      console.log(tempClass);
      return (
        <th className={tempClass} key={place.placeId}>
          {place.placeName}
        </th>
      );
    });

  return <TableHeaderWrapper>{!singlePlace && data}</TableHeaderWrapper>;
}
