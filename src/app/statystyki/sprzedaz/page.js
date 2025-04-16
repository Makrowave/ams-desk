"use client"
import {BarChart, pieArcLabelClasses, PieChart} from "@mui/x-charts";
import {useState} from "react";
import BarChartWrapper from "@/components/charts/BarChartWrapper";
import PieChartWrapper from "@/components/charts/PieChartWrapper";

export default function SaleStatsPage() {
  const [interval, setInterval] = useState("day")
  const [since, setSince] = useState(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
  const [until, setUntil] = useState(new Date().toISOString().split('T')[0])

  return (
    <>
      <div className="bg-primary mb-4 p-2 flex">
        <select value={interval} onChange={(e) => setInterval(e.target.value)}>
          <option value={"day"}>Dzień</option>
          <option value={"month"}>Miesiąc</option>
          <option value={"year"}>Rok</option>
        </select>
        <span>Od</span>
        <input type={"date"} value={since} onChange={(e) => setSince(e.target.value)}/>
        <span>Do</span>
        <input type={"date"} value={until} onChange={(e) => setUntil(e.target.value)}/>
        <button className="button-primary" onClick={() => {
          setSince(new Date().toISOString().split('T')[0])
          setUntil(new Date().toISOString().split('T')[0])
        }}>
          Dziś
        </button>
        <button className="button-primary" onClick={() => {
          setSince(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
          setUntil(new Date().toISOString().split('T')[0])
        }}>
          Tydzień
        </button>
        <button className="button-primary" onClick={() => {
          setSince(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
          setUntil(new Date().toISOString().split('T')[0])
        }}>
          30 dni
        </button>
        <button className="button-primary" onClick={() => {
          setSince(new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
          setUntil(new Date().toISOString().split('T')[0])
        }}>
          60 dni
        </button>
        <button className="button-primary" onClick={() => {
          setSince(new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
          setUntil(new Date().toISOString().split('T')[0])
        }}>
          90 dni
        </button>
        <button className="button-primary" onClick={() => {
          setSince(new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
          setUntil(new Date().toISOString().split('T')[0])
        }}>
          Rok
        </button>
        <button className="button-primary" onClick={() => {
          setSince("")
          setUntil("")
        }}>
          Zawsze
        </button>


      </div>
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
        <h2>Sprzedane rowery ze względu na kategorię </h2>
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
              height={280}
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
              height={280}
            />
          </PieChartWrapper>
        </div>
      </div>
      <div className={"bg-primary p-4 rounded-lg flex flex-col mt-8 items-center"}>
        <h2>Sprzedane rowery ze względu na typ ramy </h2>
        <div className="flex justify-center items-center w-full h-fit">
          <PieChartWrapper url={"SalesData/getFrameTypeStats"} showsQuantity queryObject={{since: since, until: until}}
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
              height={280}
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
              height={280}
            />
          </PieChartWrapper>
        </div>
      </div>
    </>
  )
}


const intervalOptions = [
  {key: "day", value: "day"},
  {key: "month", value: "month"},
  {key: "year", value: "year"},
]