"use client";
import {useStatusesQuery} from "@/hooks/queryHooks";
import AdminTable from "@/components/table/AdminTable";
import URLS from "@/util/urls";

export default function StatusPanel() {
  const {data, isLoading, isError} = useStatusesQuery();
  const rowFormat = [
    {key: "", label: "Id", input: "blank"},
    {key: "statusName", label: "Nazwa", input: "text"},
    {key: "hexCode", label: "", input: "color"}
  ]
  return (
    <div>
      {!isError && !isLoading &&
        <AdminTable data={data} headers={["Id", "Nazwa", ""]} url={URLS.Statuses} newRowFormat={rowFormat} noDelete
                    noAdd/>
      }
    </div>
  )
}
