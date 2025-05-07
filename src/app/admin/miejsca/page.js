"use client";
import {usePlacesQuery} from "@/hooks/queryHooks";
import AdminTable from "@/components/table/AdminTable";
import URLS from "@/util/urls";

export default function PlacesPanel() {
  const {data, isLoading, isError} = usePlacesQuery();
  const newRowFormat = [
    {key: "", label: "", input: "blank"},
    {key: "placeName", label: "Nazwa", input: "text"},
    {key: "isStorage", label: "Magazyn", input: "check"},
  ]
  return (
    <div>
      {!isError && !isLoading &&
        <AdminTable data={data} headers={["Id", "Nazwa", ""]} url={URLS.Colors} newRowFormat={newRowFormat}/>
      }
    </div>
  )
}
