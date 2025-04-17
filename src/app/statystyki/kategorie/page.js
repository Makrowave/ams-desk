"use client"
import TimeSelector from "@/components/charts/TimeSelector";
import {useState} from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import {useQuery} from "@tanstack/react-query";
import {QUERY_KEYS} from "@/util/query_keys";
import {BarChart, barLabelClasses, pieArcLabelClasses, PieChart} from "@mui/x-charts";
import BarChartWrapper from "@/components/charts/BarChartWrapper";
import Collapsible from "@/components/Collapsible";
import PieChartWrapper from "@/components/charts/PieChartWrapper";

export default function CategoriesStats({}) {
  const [interval, setInterval] = useState("day")
  const [since, setSince] = useState(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString('sv-SE'));
  const [until, setUntil] = useState(new Date().toLocaleDateString('sv-SE'));
  const axiosPrivate = useAxiosPrivate()
  const placesQuery = useQuery({
    queryKey: [QUERY_KEYS.Places],
    queryFn: async () => {
      const response = await axiosPrivate.get("places");
      return response.data;
    }
  })

  const sxPie = {
    [`& .${pieArcLabelClasses.root}`]: {
      fontWeight: 'bold',
      fontSize: '14px',
      fill: 'white'
    },
  }
  const sxBar = {
    [`& .${barLabelClasses.root}`]: {
      fontSize: '14px',
      fill: 'white'
    },
  }

  return (
    <>
      <TimeSelector interval={interval} setInterval={setInterval} since={since} setSince={setSince} until={until}
                    setUntil={setUntil}/>
      <div className={"bg-primary p-4 rounded-lg flex flex-col mt-8 items-center"}>
        <Collapsible title={"Sprzedane rowery ze względu na kategorię"} className={"w-full"}>
          <div className="flex justify-center items-center w-full h-fit">
            <PieChartWrapper url={"SalesData/getCategoryStats"} showsQuantity
                             queryObject={{since: since, until: until}}
                             title={"Ilość"}
                             className={"border-gray-200 border rounded-lg p-2 mx-auto"}
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
                             className={"border-gray-200 border rounded-lg p-2 mx-auto"}
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
      <div className="flex gap-80 mt-8">
        <Collapsible className={"flex flex-col gap-8 items-center p-4 bg-primary flex-1 rounded-lg self-start"}
                     title={"Ilość sprzedanych rowerów wg. kategorii"}
                     initialOpen={false}>
          {
            !placesQuery.isLoading && !placesQuery.isError &&
            placesQuery.data.map((place) => (
              <div key={place.placeId}
                   className={"p-4 flex flex-col items-center min-w-[600px]"}>
                <BarChartWrapper url={"SalesData/mostPopularCategoryByPlace"}
                                 queryObject={{since: since, until: until, isCount: true, placeId: place.placeId}}
                                 title={place.placeName}
                                 className="border border-gray-200 rounded-lg p-2 w-full"
                                 dataKey={"place"}
                                 hideSelectors
                >
                  <BarChart
                    barLabel={({value}) => `${value}`}
                    height={400}
                    sx={sxBar}
                  />
                </BarChartWrapper>
              </div>
            ))
          }
        </Collapsible>
        <Collapsible className={"flex flex-col gap-8 items-center p-4 bg-primary flex-1 rounded-lg self-start"}
                     title={"Sprzedaż wg. kategorii"}
                     initialOpen={false}>
          {
            !placesQuery.isLoading && !placesQuery.isError &&
            placesQuery.data.map((place) => (
              <div key={place.placeId}
                   className={"p-4 flex flex-col items-center min-w-[600px]"}>
                <BarChartWrapper url={"SalesData/mostPopularCategoryByPlace"}
                                 queryObject={{since: since, until: until, isCount: false, placeId: place.placeId}}
                                 title={place.placeName}
                                 className="border border-gray-200 rounded-lg p-2 w-full"
                                 dataKey={"place"}
                                 hideSelectors
                >
                  <BarChart
                    barLabel={({value}) => `${value}zł`}
                    height={400}
                    sx={sxBar}
                  />
                </BarChartWrapper>
              </div>
            ))
          }
        </Collapsible>
      </div>
    </>
  )
}