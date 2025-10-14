import { useQuery } from '@tanstack/react-query';
import { cloneElement, useEffect, useRef, useState } from 'react';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import {
  FaChartBar,
  FaChartColumn,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa6';
import { Box, IconButton, Typography } from '@mui/material';

export default function BarChartWrapper({
  url,
  queryObject,
  children,
  isStackedByDefault,
  title,
  className,
  collapsible,
  dataKey,
  hideSelectors,
  seriesProps = {},
}) {
  const [prevData, setPrevData] = useState([]);
  const queryKeys = Object.keys(queryObject);
  const queryValues = Object.values(queryObject);
  const [seriesToggles, setSeriesToggles] = useState({});
  const [height, setHeight] = useState();
  const [isOpen, setIsOpen] = useState(true);
  const [isStacked, setIsStacked] = useState(isStackedByDefault);
  const contentRef = useRef(null);

  const createQuery = (keys, values) => {
    let result = '?';
    for (let i = 0; i < keys.length; i++) {
      result += keys[i] + '=' + values[i] + '&';
    }
    return result.slice(0, -1);
  };
  const axiosPrivate = useAxiosPrivate();
  const { data } = useQuery({
    queryKey: [url, ...queryValues],
    queryFn: async () => {
      const response = await axiosPrivate.get(
        `${url}${createQuery(queryKeys, queryValues)}`,
      );
      const newToggles = Object.keys(response.data[0]).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {});
      delete newToggles[dataKey];
      if (prevData.length === 0 || newToggles !== seriesToggles) {
        setSeriesToggles(newToggles);
      }
      setPrevData(response.data);
      return response.data;
    },
    placeholderData: prevData,
  });

  const createSeries = (data, blacklist) => {
    return Object.keys(data[0] ?? {})
      .filter((item) => item !== dataKey)
      .map((key, index) => ({
        ...seriesProps,
        dataKey: key,
        label: key,
        color: chartColors[index],
        ...(isStacked && { stack: '' }),
      }))
      .filter((item) => blacklist[item.dataKey]);
  };

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isOpen]);

  const ChildComponent = () => {
    return cloneElement(children, {
      ...children.props,
      dataset: data ?? prevData,
      xAxis: [{ scaleType: 'band', dataKey: dataKey }],
      series: createSeries(prevData, seriesToggles),
      legend: { hidden: !hideSelectors },
    });
  };

  return (
    <div className={`${className} flex flex-col`}>
      <Box className="flex items-center justify-between flex-wrap relative">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {collapsible && (
            <IconButton onClick={() => setIsOpen(!isOpen)} sx={{ pr: 1 }}>
              {isOpen ? <FaChevronDown /> : <FaChevronUp />}
            </IconButton>
          )}
          <Typography variant="h6">{title}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, pr: 12 }}>
          {!hideSelectors &&
            Object.keys(seriesToggles).map((series, index) => (
              <Box key={series} sx={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type={'checkbox'}
                  className="scale-150 m-2"
                  style={{ accentColor: chartColors[index] }}
                  checked={seriesToggles[series]}
                  onChange={() => {
                    setSeriesToggles({
                      ...seriesToggles,
                      [series]: !seriesToggles[series],
                    });
                    console.log(seriesToggles);
                  }}
                />
                {series}
              </Box>
            ))}
        </Box>
        <IconButton onClick={() => setIsStacked((p) => !p)}>
          {isStacked ? <FaChartBar /> : <FaChartColumn />}
        </IconButton>
      </Box>
      <Box sx={{ height: `${height}px` }} ref={contentRef}>
        <ChildComponent />
      </Box>
    </div>
  );
}

const chartColors = [
  '#3366CC',
  '#DC3912',
  '#FF9900',
  '#109618',
  '#990099',
  '#DD4477',
  '#0099C6',
  '#3B3EAC',
  '#66AA00',
  '#B82E2E',
  '#316395',
  '#994499',
  '#22AA99',
  '#AAAA11',
  '#6633CC',
  '#E67300',
  '#8B0707',
  '#651067',
  '#329262',
  '#5574A6',
  '#3B3EAC',
  '#B77322',
  '#16D620',
  '#B91383',
];
