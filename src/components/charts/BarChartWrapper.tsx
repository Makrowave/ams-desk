import { useQuery } from '@tanstack/react-query';
import { cloneElement, useRef, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import {
  FaChartBar,
  FaChartColumn,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa6';
import {
  Box,
  Checkbox,
  Collapse,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { BarChartData } from '../../types/stats';
import { chartColors } from '../../styles/colors';

type BarChartWrapperProps<T extends string> = {
  url: string;
  queryObject: { [key: string]: any };
  children: React.ReactElement;
  title: string;
  isStackedByDefault?: boolean;
  collapsible?: boolean;
  dataKey: T;
  hideSelectors?: boolean;
  seriesProps?: { [key: string]: any };
};

const BarChartWrapper = <T extends string>({
  url,
  queryObject,
  children,
  isStackedByDefault = true,
  title,
  collapsible = false,
  dataKey,
  hideSelectors,
  seriesProps = {},
}: BarChartWrapperProps<T>) => {
  const [prevData, setPrevData] = useState<BarChartData<T>[]>([]);
  const queryKeys = Object.keys(queryObject);
  const queryValues = Object.values(queryObject);
  const [seriesToggles, setSeriesToggles] = useState<Record<string, boolean>>(
    {},
  );
  // const [height, setHeight] = useState<string | undefined>();
  const [isOpen, setIsOpen] = useState(true);
  const [isStacked, setIsStacked] = useState(isStackedByDefault);
  // const contentRef = useRef<HTMLDivElement | null>(null);

  const createQuery = (keys: string[], values: any[]) => {
    let result = '?';
    for (let i = 0; i < keys.length; i++) {
      result += keys[i] + '=' + values[i] + '&';
    }
    return result.slice(0, -1);
  };
  const axiosPrivate = useAxiosPrivate();
  const { data } = useQuery<BarChartData<T>[]>({
    queryKey: [url, ...queryValues],
    queryFn: async () => {
      const response = await axiosPrivate.get<BarChartData<T>[]>(
        `${url}${createQuery(queryKeys, queryValues)}`,
      );
      const responseKeys = Object.keys(
        response.data[0] ?? {},
      ) as (keyof BarChartData<T>)[];

      const newToggles = responseKeys.reduce((acc, key) => {
        acc = { ...acc, [key]: true };
        return acc;
      }, {}) as Record<string, boolean>;
      delete newToggles[dataKey];
      if (prevData.length === 0 || newToggles !== seriesToggles) {
        setSeriesToggles(newToggles);
      }
      setPrevData(response.data);
      return response.data;
    },
    placeholderData: prevData,
  });

  const createSeries = (
    data: BarChartData<T>[],
    blacklist: Record<string, boolean>,
  ) => {
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
    <Stack>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {collapsible && (
          <IconButton onClick={() => setIsOpen(!isOpen)} sx={{ pr: 1 }}>
            {isOpen ? <FaChevronDown /> : <FaChevronUp />}
          </IconButton>
        )}
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 2, pr: 12 }}>
          {!hideSelectors &&
            Object.keys(seriesToggles).map((series, index) => (
              <Box key={series} sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                  sx={{ '&.Mui-checked': { color: chartColors[index] } }}
                  checked={seriesToggles[series]}
                  onChange={() => {
                    setSeriesToggles({
                      ...seriesToggles,
                      [series]: !seriesToggles[series],
                    });
                    console.log(seriesToggles);
                  }}
                />
                <Typography>{series}</Typography>
              </Box>
            ))}
        </Box>
        <IconButton onClick={() => setIsStacked((p) => !p)}>
          {isStacked ? <FaChartBar /> : <FaChartColumn />}
        </IconButton>
      </Box>
      {/* {<Box sx={{ height: `${height}px` }} ref={contentRef}>} */}
      <Collapse in={isOpen || !collapsible}>
        <ChildComponent />
      </Collapse>
    </Stack>
  );
};

export default BarChartWrapper;
