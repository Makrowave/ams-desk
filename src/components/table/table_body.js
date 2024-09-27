"use client";
import { useQuery } from '@tanstack/react-query';
import BikeRecord from './bike_record';
import useAxiosPrivate from '@/hooks/use_axios_private';

export default function TableBody({ src, singlePlace, placeId }) {

  const axiosPrivate = useAxiosPrivate();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['bikes', src],
    queryFn: async () => {
      const response = await axiosPrivate.get(src);
      return response.data;
    }
  })

  if (isPending) {
    return (<tbody><tr><td colSpan={5 + (singlePlace ? 0 : 6)}>Loading...</td></tr></tbody>)
  }

  if (isError) {
    return (<tbody><tr><td colSpan={5 + (singlePlace ? 0 : 6)}>{error.message}</td></tr></tbody>)
  }

  return (
    <tbody className=''>
      {data.map((record) => (
        <BikeRecord key={record.modelId} model={record} placeCount={singlePlace ? 0 : 6} placeId={placeId} />
      ))}
      <tr><td colSpan={5 + (singlePlace ? 0 : 6)}></td></tr> {/*This div makes it so the rows don't stretch*/}
    </tbody>
  )
}