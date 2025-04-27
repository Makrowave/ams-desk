"use client"

import ShortSaleHistoryTable from "@/components/table/stats/ShortSaleHistoryTable";
import BarChartWrapper from "@/components/charts/BarChartWrapper";
import {BarChart} from "@mui/x-charts";
import {useQuery} from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

export default function DashBoard() {

  const axiosPrivate = useAxiosPrivate()
  const {data: todayData, isError: todayError, isLoading: todayLoading} = useQuery({
    queryKey: ["getOverallStats", getToday(), getToday()],
    queryFn: async () => {
      const response = await axiosPrivate.get(`SalesData/getOverallStats?since=${getToday()}&until=${getToday()}`);
      return response.data;
    }
  })
  const {data: weekData, isError: weekError, isLoading: weekLoading} = useQuery({
    queryKey: ["getOverallStats", getStartOfWeek(), getEndOfWeek()],
    queryFn: async () => {
      const response = await axiosPrivate.get(`SalesData/getOverallStats?since=${getStartOfWeek()}&until=${getEndOfWeek()}`);
      return response.data;
    }
  })
  const {data: monthData, isError: monthError, isLoading: monthLoading} = useQuery({
    queryKey: ["getOverallStats", getStartOfMonth(), getEndOfMonth()],
    queryFn: async () => {
      const response = await axiosPrivate.get(`SalesData/getOverallStats?since=${getStartOfMonth()}&until=${getEndOfMonth()}`);
      return response.data;
    }
  })


  return (
    <>
      <div className="flex flex-col gap-4">
        <div className={"flex justify-between items-stretch gap-4 mt-4"}>
          <div className="bg-primary p-4 rounded-lg flex flex-col flex-1">
            <BarChartWrapper url={"SalesData/soldSum"}
                             queryObject={{
                               since: new Date().toLocaleDateString('sv-SE'),
                               until: new Date().toLocaleDateString('sv-SE'),
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
            <h2><b>Historia</b></h2>
            <ShortSaleHistoryTable/>
          </div>
        </div>
        <div className={"flex justify-between items-stretch gap-4 mt-4"}>
          <div className="bg-primary p-4 rounded-lg flex flex-col flex-1">
            <BarChartWrapper url={"SalesData/soldSum"}
                             queryObject={{
                               since: getStartOfWeek(),
                               until: getEndOfWeek(),
                               interval: "day"
                             }}
                             title={"Rowery sprzedane w tym tygodniu"}
                             className="border border-gray-200 rounded-lg p-2"
                             dataKey={"date"}
            >
              <BarChart
                barLabel={"value"}
                height={400}
              />
            </BarChartWrapper>
          </div>
          <div className="bg-primary p-4 rounded-lg flex flex-col *:flex *:justify-between *:gap-x-32 gap-2">
            <div>
              <span>Sprzedaż dzisiaj</span>
              <span>{todayData?.sum ?? ""} PLN</span>
            </div>
            <div>
              <span>Ilość rowerów dzisiaj</span>
              <span>{todayData?.count ?? ""}</span>
            </div>
            <div>
              <span>Sprzedaż tygodnia</span>
              <span>{weekData?.sum ?? ""} PLN</span>
            </div>
            <div>
              <span>Ilość rowerów w tym tygodniu</span>
              <span>{weekData?.count ?? ""}</span>
            </div>
            <div>
              <span>Sprzedaż miesiąca</span>
              <span>{monthData?.sum ?? ""} PLN</span>
            </div>
            <div>
              <span>Ilość rowerów w tym miesiącu</span>
              <span>{monthData?.count ?? ""}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function getStartOfWeek() {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diffToMonday = (dayOfWeek + 6) % 7;

  const monday = new Date(now);
  monday.setDate(now.getDate() - diffToMonday);
  monday.setHours(0, 0, 0, 0);

  return monday.toLocaleDateString('sv-SE');
}

function getEndOfWeek() {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diffToMonday = (dayOfWeek + 6) % 7;

  const sunday = new Date(now);
  sunday.setDate(now.getDate() + (6 - diffToMonday));
  sunday.setHours(23, 59, 59, 999);

  return sunday.toLocaleDateString('sv-SE');
}

function getStartOfMonth() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  return start.toLocaleDateString('sv-SE');
}

function getEndOfMonth() {
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Day 0 of next month = last day of this month
  return end.toLocaleDateString('sv-SE');
}

function getToday() {
  return new Date().toLocaleDateString('sv-SE');
}