"use client";
import {DataSelect} from "../input/DataSelect";
import {createQueryHook} from "@/hooks/queryHooks";


export default function FetchSelect({
                                      urlKey,
                                      params = null,
                                      value,
                                      onChange,
                                      title,
                                      defaultValue,
                                      defaultLabel,
                                    }) {
  const hook = createQueryHook(urlKey);
  const {data, isPending, isError, error, refetch} = hook(params)

  if (isPending) {
    return (
      <div className='text-center bg-primary border-2 border-tertiary rounded w-full'>Ładowanie</div>
    );
  }

  if (isError) {
    return (
      <div className='text-center bg-error-light text-error-dark border-2 border-tertiary rounded w-full'>
        <button onClick={() => refetch()} className='flex justify-center self-start flex-row w-full'>
          Błąd {error?.response?.status} <img src='/refresh.png' className='h-5 self-center px-2 rotate-[135deg]'/>
        </button>
      </div>
    );
  }
  return (
    <DataSelect
      defaultValue={defaultValue}
      defaultLabel={defaultLabel}
      value={value}
      onChange={onChange}
      options={data}
      label={title}
    />
  );
}
