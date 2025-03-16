"use client";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import {useQuery} from "@tanstack/react-query";
import {Select} from "../input/Select";

// Component that turns data fetch from 'src' to <option> list.
// Fetched data scheme:
// 1. Key (int) required
// 2. Name (string) required
// 3. Color (string: '#XXXXXX')
// 4. Trash unless I write DTO in backend
export default function FetchSelect({
                                      src,
                                      queryKey,
                                      value,
                                      onChange,
                                      title,
                                      default_option,
                                      default_title,
                                      isColored,
                                    }) {
  const axiosPrivate = useAxiosPrivate();
  const {data, isPending, isError, error, refetch} = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await axiosPrivate.get(src);
      return response.data;
    },
  });

  const Body = ({children}) => {
    return (
      <div className='flex justify-center flex-col'>
        <div className='flex justify-center self-start'>
          <p>{title}</p>
        </div>
        <div className='flex justify-center items-center self-start w-full'>{children}</div>
      </div>
    );
  };

  if (isPending) {
    return (
      <Body>
        <div className=' text-center bg-primary border-2 border-tertiary rounded w-full'>Ładowanie</div>
      </Body>
    );
  }

  if (isError) {
    return (
      <Body>
        <div className='text-center bg-error-light text-error-dark border-2 border-tertiary rounded w-full'>
          <button onClick={() => refetch()} className='flex justify-center self-start flex-row w-full'>
            Błąd {error?.response?.status} <img src='/refresh.png' className='h-5 self-center px-2 rotate-[135deg]'/>
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
