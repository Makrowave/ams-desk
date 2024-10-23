"use client";
import useAxiosPrivate from "@/hooks/use_axios_private";
import { useQuery } from "@tanstack/react-query";

// Component that turns data fetch from 'src' to <option> list.
// Data fetched should have unique key as first parameter and name as second
// Shows an icon if value other than default is chosen
export default function ValidationFetchSelect({
  src,
  queryKey,
  value,
  onChange,
  title,
  default_option,
  default_title,
  useRowStyle,
}) {
  const Body = ({ children }) => {
    return (
      <div className={useRowStyle ? "flex flex-row justify-between" : "flex justify-center flex-col"}>
        <div className='flex justify-center self-start flex-row'>
          <p>{title}</p>
          <img className='h-5 self-center px-2' src={value === default_option ? "/red_cross.png" : "/checkmark.png"} />
        </div>
        <div
          className={
            useRowStyle
              ? "flex justify-center items-center self-end w-1/2"
              : "flex justify-center items-center self-start w-full"
          }
        >
          <select
            className='text-center bg-primary border-2 border-tertiary rounded w-full'
            value={value}
            onChange={onChange}
          >
            {children}
          </select>
        </div>
      </div>
    );
  };
  const axiosPrivate = useAxiosPrivate();
  const { data, isPending, isError, error } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await axiosPrivate.get(src);
      return response.data;
    },
  });

  if (isPending) {
    return (
      <Body>
        <option>Loading</option>
      </Body>
    );
  }

  if (isError) {
    return (
      <Body>
        <option>{error.message}</option>
      </Body>
    );
  }

  return (
    <Body>
      <option value={default_option}> {default_title} </option>
      {data.map((d) => (
        <option value={Object.values(d)[0]} key={Object.values(d)[0]}>
          {Object.values(d)[1]}
        </option>
      ))}
    </Body>
  );
}
