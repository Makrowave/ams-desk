"use client";
import {DataSelect} from "../input/DataSelect";
import {FaCheck, FaXmark} from "react-icons/fa6";
import {createQueryHook} from "@/hooks/queryHooks";

// Component that turns data fetch from 'src' to <option> list.
// Data fetched should have unique key as first parameter and name as second
// Shows an icon if value other than default is chosen
export default function ValidationFetchSelect({
                                                urlKey,
                                                params = null,
                                                value,
                                                onChange,
                                                title,
                                                defaultValue,
                                                defaultLabel,
                                                useRowStyle,
                                                isColored,
                                              }) {
  const Body = ({children}) => {
    return (
      <div className={useRowStyle ? "flex flex-row justify-between" : "flex justify-center flex-col"}>
        <div className='flex justify-center items-center self-start flex-row'>
          <span className='mr-1'>{title}</span>
          {value === defaultValue ? <FaXmark className='text-red-600'/> : <FaCheck className='text-green-500'/>}
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

  const hook = createQueryHook(urlKey)
  const {data, isPending, isError, error, refetch} = hook(params)

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
            Błąd {error?.response?.status} <img src='/refresh.png' className='h-5 self-center px-2 rotate-[135deg]'/>
          </button>
        </div>
      </Body>
    );
  }

  return (
    <Body>
      <DataSelect
        pKey={value}
        defaultKey={defaultValue}
        defaultValue={defaultLabel}
        onChange={onChange}
        options={data}
        isColored={isColored}
        className=' text-center bg-primary border-2 border-tertiary rounded w-full'
      />
    </Body>
  );
}
