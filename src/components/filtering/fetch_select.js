"use client";
import useAxiosPrivate from '@/hooks/use_axios_private';
import { useQuery } from '@tanstack/react-query';

// Component that turns data fetch from 'src' to <option> list.
// Data fetched should have unique key as first parameter and name as second
export default function FetchSelect({ src, queryKey, value, onChange, title, default_option}) {

  const Body = ({children}) => {
    return (
      <div className="flex justify-center flex-col">
        <div className="flex justify-center self-start">
          <p>{title}</p>
        </div>
        <div className="flex justify-center items-center self-start w-full">
          <select className="text-black text-center bg-primary border-2 border-tertiary rounded w-full" value={value} onChange={onChange}>
            {children}
          </select>
        </div>
      </div>
    )
  }
  const axiosPrivate = useAxiosPrivate();
  const { data, isPending, isError, error } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await axiosPrivate.get(src);
      return response.data;
    }
  })

  if (isPending) {
    return <Body><option>Loading</option></Body>
  }

  if (isError) {
    return <Body><option>{error.message}</option></Body>
  }

  return (
    <Body>
      {
        default_option === null
        ? <></>
        : <option value={default_option}> Dowolny </option>
      }
      {data.map((d) => (
        <option value={Object.values(d)[0]} key={Object.values(d)[0]}>{Object.values(d)[1]}</option>
      ))}
    </Body>
  )

}