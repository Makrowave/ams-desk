"use client";
import "../table.css";
import ManufacturerRow from "./ManufacturerRow";
import {useManufacturersQuery} from "@/hooks/queryHooks";

export default function ManufacturerTable() {
  const {data, isPending, isError, error} = useManufacturersQuery(null, {refetchInterval: 5000})
  return (
    <table className='table w-full'>
      <thead className='bg-secondary mb-px sticky top-0 z-10 shadow-lg h-10'>
      <tr>
        <th className='w-20'>Id</th>
        <th>Nazwa</th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      {!isPending &&
        !isError &&
        data.map((manufacturer, index) => (
          <ManufacturerRow
            manufacturer={manufacturer}
            key={manufacturer.manufacturerId}
            prev={data[index - 1]?.manufacturerId}
            next={data[index + 1]?.manufacturerId}
          />
        ))}
      </tbody>
    </table>
  );
}
