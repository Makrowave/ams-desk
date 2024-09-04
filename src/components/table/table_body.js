"use client";
import { useQuery } from '@tanstack/react-query';
import BikeRecord from './bike_record';




export default function TableBody({ src, placeCount }) {
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
    return <tbody>Loading...</tbody>
  }

  if (isError) {
    return <tbody>{error.message}</tbody>
  }
  return (
    <tbody className='flex-col align-top'>
      {
        data.map((record) => (
          <BikeRecord key={record.modelId} bike={record} placeCount={placeCount} />
        ))
      }
      <div></div> {/*This div makes it so the rows don't stretch*/}
    </tbody>

  )
}