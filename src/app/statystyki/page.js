"use client"

import ShortSaleHistoryTable from "@/components/table/stats/ShortSaleHistoryTable";
import BarChartWrapper from "@/components/charts/BarChartWrapper";
import {BarChart} from "@mui/x-charts";

export default function DashBoard() {

  return (
    <>
      <div className="flex justify-between items-stretch gap-4 mt-4">
        <div className="bg-primary p-4 rounded-lg flex flex-col flex-1">
          <BarChartWrapper url={"SalesData/soldSum"}
                           queryObject={{
                             since: new Date().toLocaleDateString('sv-SE'),
                             until: new Date().toLocaleDateString('sv-SE'),
                             // since: "2025-04-14",
                             // until: "2025-04-14",
                             interval: "day"
                           }}
                           title={"Rowery sprzedane dzisiaj"}
                           className="border border-gray-200 rounded-lg p-2"
                           dataKey={"date"}
          >
            <BarChart
              barLabel={"value"}
              height={400}
            />
          </BarChartWrapper>
        </div>
        <div className="bg-primary p-4 rounded-lg flex flex-col">
          <ShortSaleHistoryTable/>
        </div>
      </div>
    </>
  )
}