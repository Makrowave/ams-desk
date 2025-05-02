"use client";
import ColorRow from "./ColorRow";
import "../table.css";
import {useColorsQuery} from "@/hooks/queryHooks";

export default function ColorTable() {
  const {data, isPending, isError, error} = useColorsQuery(null, {refetchInterval: 5000});
  return (
    <table className='table w-full'>
      <thead className='bg-secondary mb-px sticky top-0 z-10 shadow-lg h-10'>
      <tr>
        <th className='w-20'>Id</th>
        <th className='w-14'></th>
        <th>Nazwa</th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      {!isPending &&
        !isError &&
        data.map((color, index) => (
          <ColorRow
            color={color}
            key={color.colorId}
            prev={data[index - 1]?.colorId}
            next={data[index + 1]?.colorId}
          />
        ))}
      </tbody>
    </table>
  );
}
