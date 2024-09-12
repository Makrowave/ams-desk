import { useEffect, useState } from "react"
import ChangeTable from "@/components/filtering/change_table";
import TableHeader from "@/components/table/table_header";
import TableBody from "@/components/table/table_body";



export default function BikeTable({filterSrc}) {
  const [place, setPlace] = useState(0);
  const srcStart = "https://localhost:7077/api/Desktop/";
  let src = "https://localhost:7077/api/Desktop/"

  if(place === 0) {
    src = srcStart + "GetBikes";
  } else {
    src = srcStart + "GetBikesByPlace/" + place.toString();
  }

  let singlePlace = place !== 0;

  return (
    <div className="col-span-5 flex justify-center mx-4 border-l-2 pl-5 border-tertiary">
      <div>
        <ChangeTable changePlaceId={(index) => setPlace(index)} />
        <table className="table-fixed min-w-full text-center">
          <TableHeader singlePlace={singlePlace} />
          <TableBody
            singlePlace={singlePlace}
            placeId={place}
            src={
              src + filterSrc
            }
          />
        </table>
      </div>
    </div>
  )
}