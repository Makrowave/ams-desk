"use client";
import AdminTable from "@/components/table/AdminTable";
import URLS from "@/util/urls";
import {useWheelSizesQuery} from "@/hooks/queryHooks";

export default function CategoriesPanel() {
  const {data, isError, isLoading} = useWheelSizesQuery();
  const newRowFormat = [
    {key: "wheelSize", label: "Koło", input: "text"}
  ]
  return (
    <div>
      {
        !isLoading && !isError &&
        <AdminTable data={data.map(row => ({wheelSize: row.value}))} url={URLS.WheelSizes} headers={["Koło"]} noEdit
                    noReorder
                    addAsQuery
                    className={"min-w-[400px]"}
                    newRowFormat={newRowFormat}/>
      }
    </div>
  );
}
