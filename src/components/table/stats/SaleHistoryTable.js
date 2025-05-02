import ColorPreview from "@/components/table/ColorPreview";
import {usePlacesQuery, useSoldBikesQuery} from "@/hooks/queryHooks";

export default function SaleHistoryTable({since, until}) {
  const {data, isError, isLoading} = useSoldBikesQuery({since: since ?? "", until: until ?? ""});

  //TODO
  const {data: placeData, isError: placeIsError, isLoading: placeIsLoading} = usePlacesQuery()

  return (
    <div className="w-fit h-[500px] overflow-y-auto rounded-lg border-gray-200 border">
      {!isError && !isLoading &&
        <div>
          <table className="h-[400px]">
            <thead className="top-0 sticky bg-white">
            <tr>
              <th></th>
              <th>Model</th>
              <th>Miejsce</th>
              <th>Producent</th>
              <th>Cena</th>
              <th>Cena sprzedaży</th>
              <th>Zniżka</th>
              <th>Zniżka %</th>
              <th>Data</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item) => (
              <tr key={item.id}
                  className={`*:py-1 *:px-2 ${new Date().toLocaleDateString('sv-SE') === item.saleDate ? "text-blue-600" : ""} text-center`}>
                <td>
                  <ColorPreview primaryColor={item.primaryColor} secondaryColor={item.secondaryColor}/>
                </td>
                <td>{item.model}</td>
                <td>{item.place}</td>
                <td>{item.manufacturer}</td>
                <td>{item.price}</td>
                <td>{item.salePrice}</td>
                <td>{item.discount}</td>
                <td>{item.discountPercent}</td>
                <td>{item.saleDate}</td>
              </tr>))}
            </tbody>
          </table>
        </div>
      }
    </div>
  )
}