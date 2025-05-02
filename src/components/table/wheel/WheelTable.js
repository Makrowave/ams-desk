"use client";
import CategoryRow from "./WheelRow";
import "../table.css";
import {useWheelSizesQuery} from "@/hooks/queryHooks";

export default function WheelTable() {
  const {data, isPending, isError, error} = useWheelSizesQuery(null, {refetchInterval: 5000,})
  return (
    <table className='table w-full'>
      <thead className='bg-secondary mb-px sticky top-0 z-10 shadow-lg h-10'>
      <tr>
        <th className='w-20'>Rozmiar</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      {!isPending && !isError && data.map((wheel) => <CategoryRow wheel={wheel.value} key={wheel.key}/>)}
      </tbody>
    </table>
  );
}
