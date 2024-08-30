"use client";
import { useQuery } from '@tanstack/react-query';

// Component that turns data fetch from 'src' to <option> list.
// Data fetched should have unique key as first parameter and name as second
export default function FetchSelect({src, queryKey}) {

  const {data, isPending, isError , error} = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await fetch(src);
      if(!response.ok) {
        throw new Error('Data fetch failed!');
      }
      return response.json();
    }
  })

  if(isPending) {
    return <option>Loading</option>
  }

  if(isError) {
    return <option>{error.message}</option>
  }
  
  return(
    <>
    {data.map((d) => (
      <option value={Object.values(d)[0]} key={Object.values(d)[0]}>{Object.values(d)[1]}</option>
    ))}
    </>
  )

}