import {useQuery} from "@tanstack/react-query";
import {cloneElement, useState} from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

export default function BarChartWrapper({url, queryObject, children, isStacked, title, className}) {
  const [prevData, setPrevData] = useState([]);
  const queryKeys = Object.keys(queryObject);
  const queryValues = Object.values(queryObject);
  const [seriesToggles, setSeriesToggles] = useState({});
  const createQuery = (keys, values) => {
    let result = "?"
    for (let i = 0; i < keys.length; i++) {
      result += keys[i] + "=" + values[i] + "&";
    }
    return result.slice(0, -1);
  }
  const axiosPrivate = useAxiosPrivate()
  const {data} = useQuery({
    queryKey: [url, ...queryValues],
    queryFn: async () => {
      const response = await axiosPrivate.get(`${url}${createQuery(queryKeys, queryValues)}`);
      if (prevData.length === 0) {
        setSeriesToggles(
          Object.keys(response.data[0])
            .filter(key => key !== 'date')
            .reduce((acc, key) => {
              acc[key] = true
              return acc;
            }, {})
        )
      }
      setPrevData(response.data);
      return response.data;
    },
    placeholderData: prevData
  })

  const createSeries = (data, blacklist) => {
    return Object.keys(data[0] ?? {})
      .map((key, index) =>
        ({dataKey: key, label: key, color: chartColors[index], ...(isStacked && {stack: ""})}))
      .filter(item => item.dataKey !== 'date' && blacklist[item.dataKey])
  }
  const ChildComponent = () => {
    return cloneElement(children,
      {
        ...children.props,
        dataset: data ?? prevData,
        xAxis: [{scaleType: 'band', dataKey: 'date'}],
        series: createSeries(prevData, seriesToggles),
        legend: {hidden: true}
      }
    )
  }

  return (
    <div className={`${className} flex flex-col`}>
      <div className={`flex`}>
        <h2>{title}</h2>
        <div>
          {
            Object.keys(seriesToggles).map((series) => (
              <div key={series}>
                <input type={"checkbox"} checked={seriesToggles[series]} onChange={() => {
                  setSeriesToggles(
                    {...seriesToggles, [series]: !seriesToggles[series]}
                  );
                  console.log(seriesToggles)
                }}/>
                {series}
              </div>
            ))
          }

        </div>
      </div>
      <ChildComponent/>
    </div>
  )
}

const chartColors = [
  '#3366CC', '#DC3912', '#FF9900', '#109618',
  '#990099', '#3B3EAC', '#0099C6', '#DD4477',
  '#66AA00', '#B82E2E', '#316395', '#994499',
  '#22AA99', '#AAAA11', '#6633CC', '#E67300',
  '#8B0707', '#651067', '#329262', '#5574A6',
  '#3B3EAC', '#B77322', '#16D620', '#B91383',
];