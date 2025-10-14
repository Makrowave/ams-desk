import { useQuery } from '@tanstack/react-query';
import { cloneElement, useState } from 'react';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { Box, Typography } from '@mui/material';

export default function PieChartWrapper({
  url,
  queryObject,
  children,
  showsQuantity,
  title,
  className,
}) {
  const [prevData, setPrevData] = useState([]);
  const queryKeys = Object.keys(queryObject);
  const queryValues = Object.values(queryObject);
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
      setPrevData(response.data);
      return response.data;
    },
    placeholderData: prevData,
  });

  const ChildComponent = () => {
    return cloneElement(children, {
      ...children.props,
      series: [
        {
          data: preparePieChartData(data ?? prevData, showsQuantity),
          arcLabel: (item) => `${item.value} ${showsQuantity ? '' : 'zł'}`,
          arcLabelMinAngle: 20,
          arcLabelRadius: '60%',
        },
      ],
    });
  };

  return (
    <Box className={`${className} flex flex-col`}>
      <Typography variant="h6">{title}</Typography>
      <ChildComponent />
    </Box>
  );
}

const chartColors = [
  '#3366CC',
  '#DC3912',
  '#FF9900',
  '#109618',
  '#990099',
  '#3B3EAC',
  '#0099C6',
  '#DD4477',
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

const preparePieChartData = (data, isQuantity) => {
  let sortedData = [...data];
  sortedData.sort((a, b) => a.value - b.value);

  let mappedData = sortedData.map((category, index) => ({
    id: category.id,
    value: isQuantity ? category.quantity : category.value,
    label: category.name,
    color: chartColors[index],
  }));
  mappedData.sort((a, b) => a.value - b.value);
  return mappedData;
};
