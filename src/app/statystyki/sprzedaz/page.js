"use client"
import {BarChart, pieArcLabelClasses, PieChart} from "@mui/x-charts";
import {useState} from "react";
import BarChartWrapper from "@/components/charts/BarChartWrapper";
import PieChartWrapper from "@/components/charts/PieChartWrapper";
import TimeSelector from "@/components/charts/TimeSelector";
import Collapsible from "@/components/Collapsible";

export default function SaleStatsPage() {
  const [interval, setInterval] = useState("day")
  const [since, setSince] = useState(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
  const [until, setUntil] = useState(new Date().toISOString().split('T')[0])

  return (
    <>
      <TimeSelector interval={interval} setInterval={setInterval} since={since} setSince={setSince} until={until}
                    setUntil={setUntil}/>
      <div className="bg-primary p-4 rounded-lg flex flex-col">
        <BarChartWrapper url={"SalesData/soldSum"} isStacked
                         queryObject={{since: since, until: until, interval: interval}}
                         title={"Wartość sprzedanych rowerów w czasie"}>
          <BarChart
            barLabel={interval === "day" ? "" : "value"}
            height={400}
          />
        </BarChartWrapper>
      </div>
      <div className={"bg-primary p-4 rounded-lg flex flex-col mt-8 items-center"}>
        <Collapsible title={"Sprzedane rowery ze względu na kategorię"}>
          <div className="flex justify-center items-center w-full h-fit">
            <PieChartWrapper url={"SalesData/getCategoryStats"} showsQuantity
                             queryObject={{since: since, until: until}}
                             title={"Ilość"}
                             className={"border-gray-200 border rounded-lg p-2 m-2"}
            >
              <PieChart
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    fontWeight: 'bold',
                    fontSize: '14px',
                    fill: 'white'
                  },
                }}
                width={600}
                height={400}
              />
            </PieChartWrapper>
            <PieChartWrapper url={"SalesData/getCategoryStats"} queryObject={{since: since, until: until}}
                             title={"Przychód"}
                             className={"border-gray-200 border rounded-lg p-2 m-2"}
            >
              <PieChart
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    fontWeight: 'bold',
                    fontSize: '14px',
                    fill: 'white'
                  },
                }}
                width={600}
                height={400}
              />
            </PieChartWrapper>
          </div>
        </Collapsible>
      </div>
      <div className={"bg-primary p-4 rounded-lg flex flex-col mt-8 items-center"}>
        <Collapsible title={"Sprzedane rowery ze względu na typ ramy"}>
          <div className="flex justify-center items-center w-full h-fit">
            <PieChartWrapper url={"SalesData/getFrameTypeStats"} showsQuantity
                             queryObject={{since: since, until: until}}
                             title={"Ilość"}
                             className={"border-gray-200 border rounded-lg p-2 m-2"}
            >
              <PieChart
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    fontWeight: 'bold',
                    fontSize: '14px',
                    fill: 'white'
                  },
                }}
                width={600}
                height={400}
              />
            </PieChartWrapper>
            <PieChartWrapper url={"SalesData/getFrameTypeStats"} queryObject={{since: since, until: until}}
                             title={"Przychód"}
                             className={"border-gray-200 border rounded-lg p-2 m-2"}
            >
              <PieChart
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    fontWeight: 'bold',
                    fontSize: '14px',
                    fill: 'white'
                  },
                }}
                width={600}
                height={400}
              />
            </PieChartWrapper>
          </div>
        </Collapsible>
      </div>
      <div className={"bg-primary p-4 rounded-lg flex flex-col mt-8 items-center"}>
        <Collapsible title={"Sprzedane rowery ze względu na to czy są elektryczne"}>
          <div className="flex justify-center items-center w-full h-fit">
            <PieChartWrapper url={"SalesData/getElectricShare"} showsQuantity queryObject={{since: since, until: until}}
                             title={"Ilość"}
                             className={"border-gray-200 border rounded-lg p-2 m-2"}
            >
              <PieChart
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    fontWeight: 'bold',
                    fontSize: '14px',
                    fill: 'white'
                  },
                }}
                width={600}
                height={400}
              />
            </PieChartWrapper>
            <PieChartWrapper url={"SalesData/getElectricShare"} queryObject={{since: since, until: until}}
                             title={"Przychód"}
                             className={"border-gray-200 border rounded-lg p-2 m-2"}
            >
              <PieChart
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    fontWeight: 'bold',
                    fontSize: '14px',
                    fill: 'white'
                  },
                }}
                width={600}
                height={400}
              />
            </PieChartWrapper>
          </div>
        </Collapsible>
      </div>
    </>
  )
}