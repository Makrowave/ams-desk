import { useQuery } from '@tanstack/react-query';
import { cloneElement, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Box, Typography } from '@mui/material';
import { chartColors } from '../../styles/colors';
import { PieChart } from '../../types/stats';

type PieChartWrapperProps = {
  url: string;
  queryObject: { [key: string]: any };
  children: React.ReactElement;
  showsQuantity?: boolean;
  title: string;
};

const PieChartWrapper = ({
  url,
  queryObject,
  children,
  showsQuantity = false,
  title,
}: PieChartWrapperProps) => {
  const [prevData, setPrevData] = useState<PieChart[]>([]);
  const queryKeys = Object.keys(queryObject);
  const queryValues = Object.values(queryObject);
  const createQuery = (keys: string[], values: any[]) => {
    let result = '?';
    for (let i = 0; i < keys.length; i++) {
      result += keys[i] + '=' + values[i] + '&';
    }
    return result.slice(0, -1);
  };
  const axiosPrivate = useAxiosPrivate();
  const { data } = useQuery<PieChart[]>({
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
          arcLabel: (item: PieChart) =>
            `${item.value} ${showsQuantity ? '' : 'zł'}`,
          arcLabelMinAngle: 20,
          arcLabelRadius: '60%',
        },
      ],
    });
  };

  return (
    <Box>
      <Typography variant="h6">{title}</Typography>
      <ChildComponent />
    </Box>
  );
};

const preparePieChartData = (data: PieChart[], isQuantity: boolean) => {
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

export default PieChartWrapper;
