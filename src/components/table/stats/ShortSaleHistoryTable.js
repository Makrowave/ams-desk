import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import {useQuery} from "@tanstack/react-query";
import ColorPreview from "@/components/table/ColorPreview";

export default function ShortSaleHistoryTable({}) {

  const axiosPrivate = useAxiosPrivate();

  const {data, isError, isLoading} = useQuery({
    queryKey: [],
    queryFn: async () => {
      const result = await axiosPrivate.get(`SalesData/sold?limit=50`)
      return result.data
    }
  })

  return (
    <div className="w-fit h-[500px] overflow-y-auto rounded-lg border-gray-200 border">
      {!isError && !isLoading &&
        <table className="h-[400px] w-[600px]">
          <thead className="top-0 sticky bg-white">
          <tr>
            <th></th>
            <th className="w-60">Model</th>
            <th>Miejsce</th>
            <th>Cena</th>
            <th>Data</th>
          </tr>
          </thead>
          <tbody>
          {data.map((item) => (
            <tr key={item.id}
                className={`*:py-1 *:px-2 ${new Date().toLocaleDateString('sv-SE') === item.saleDate ? "text-blue-600" : ""}`}>
              <td>
                <ColorPreview primaryColor={item.primaryColor} secondaryColor={item.secondaryColor}/>
              </td>
              <td className="max-w-60 overflow-hidden whitespace-nowrap text-ellipsis truncate">{item.model}</td>
              <td>{item.place}</td>
              <td>{item.salePrice}</td>
              <td>{item.saleDate}</td>
            </tr>))}
          </tbody>
        </table>}
    </div>
  )
}