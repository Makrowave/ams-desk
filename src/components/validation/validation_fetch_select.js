"use client";
import useAxiosPrivate from "@/hooks/use_axios_private";
import { useQuery } from "@tanstack/react-query";
import { Select } from "../input/select";

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
          {children}
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
        <div className=' text-center bg-primary border-2 border-tertiary rounded w-full'>Loading</div>
      </Body>
    );
  }

  if (isError) {
    return (
      <Body>
        <div className=' text-center bg-error-light text-error-dark border-2 border-tertiary rounded w-full'>
          Błąd {error.code}
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
