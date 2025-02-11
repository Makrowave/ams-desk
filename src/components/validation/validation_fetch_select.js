"use client";
import useAxiosPrivate from "@/hooks/use_axios_private";
import { useQuery } from "@tanstack/react-query";
import { Select } from "../input/select";
import { FaCheck, FaXmark } from "react-icons/fa6";

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
  isColored,
}) {
  const Body = ({ children }) => {
    return (
      <div className={useRowStyle ? "flex flex-row justify-between" : "flex justify-center flex-col"}>
        <div className='flex justify-center items-center self-start flex-row'>
          <span className='mr-1'>{title}</span>
          {value === default_option ? <FaCheck className='text-green-500' /> : <FaXmark className='text-red-600' />}
        </div>
        <div
          className={
            useRowStyle
              ? "flex justify-center items-center self-end w-1/2"
              : "flex justify-center items-center self-start w-full"
          }
        >
          {children}
        </div>
      </div>
    );
  };
  const axiosPrivate = useAxiosPrivate();
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await axiosPrivate.get(src);
      return response.data;
    },
  });

  if (isPending) {
    return (
      <Body>
        <div className='text-center bg-primary border-2 border-tertiary rounded w-full'>Loading</div>
      </Body>
    );
  }

  if (isError) {
    return (
      <Body>
        <div className='text-center bg-error-light text-error-dark border-2 border-tertiary rounded w-full'>
          <button onClick={() => refetch()} className='flex justify-center self-start flex-row w-full'>
            Błąd {error?.response?.status} <img src='/refresh.png' className='h-5 self-center px-2 rotate-[135deg]' />
          </button>
        </div>
      </Body>
    );
  }

  return (
    <Body>
      <Select
        pKey={value}
        defaultKey={default_option}
        defaultValue={default_title}
        onChange={onChange}
        options={data}
        isColored={isColored}
        className=' text-center bg-primary border-2 border-tertiary rounded w-full'
      />
    </Body>
  );
}
