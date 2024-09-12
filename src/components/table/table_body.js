"use client";
import { useQuery } from '@tanstack/react-query';
import BikeRecord from './bike_record';

export default function TableBody({ src, singlePlace, placeId }) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['bikes', src],
    queryFn: async () => {
      const response = await fetch(src);
      if (!response.ok) {
        throw new Error('Header status fetch failed!');
      }
      return response.json();
    }
  })

  if (isPending) {
    return (<tbody><tr><td colSpan={5 + (singlePlace ? 0 : 6)}>Loading...</td></tr></tbody>)
  }

  if (isError) {
    return (<tbody><tr><td colSpan={5 + (singlePlace ? 0 : 6)}>{error.message}</td></tr></tbody>)
  }

  return (
    <tbody className='flex-col align-top'>
      {data.map((record) => (
        <BikeRecord key={record.modelId} model={record} placeCount={singlePlace ? 0 : 6} placeId={placeId} />
      ))}
      <tr><td colSpan={5 + (singlePlace ? 0 : 6)}></td></tr> {/*This div makes it so the rows don't stretch*/}
    </tbody>
  )
}