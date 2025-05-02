"use client";
import CategoryRow from "./CategoryRow";
import "../table.css";
import {useCategoriesQuery} from "@/hooks/queryHooks";

export default function CategoryTable() {
  const {data, isPending, isError, error} = useCategoriesQuery(null, {refetchInterval: 5000})
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
        data.map((category, index) => (
          <CategoryRow
            category={category}
            key={category.categoryId}
            prev={data[index - 1]?.categoryId}
            next={data[index + 1]?.categoryId}
          />
        ))}
      </tbody>
    </table>
  );
}
