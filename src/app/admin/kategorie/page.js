"use client";
import {useCategoriesQuery} from "@/hooks/queryHooks";
import AdminTable from "@/components/table/AdminTable";
import URLS from "@/util/urls";

export default function CategoriesPanel() {
  const {data, isLoading, isError} = useCategoriesQuery();
  const newRowFormat = [{key: "categoryName", label: "Nazwa", input: "text"}]
  return (
    <div>
      {!isError && !isLoading &&
        <AdminTable data={data} headers={["Id", "Nazwa"]} url={URLS.Categories} newRowFormat={newRowFormat}/>
      }
    </div>
  )
}
