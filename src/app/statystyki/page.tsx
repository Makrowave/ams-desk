'use client';
import ShortSaleHistoryTable from '../../components/table/stats/ShortSaleHistoryTable';
import BarChartWrapper from '../../components/charts/BarChartWrapper';
import { BarChart, LineChart } from '@mui/x-charts';
import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Box, Stack, Paper, Typography } from '@mui/material';

const getStartOfWeek = () => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diffToMonday = (dayOfWeek + 6) % 7;
  const monday = new Date(now);
  monday.setDate(now.getDate() - diffToMonday);
  monday.setHours(0, 0, 0, 0);
  return monday.toLocaleDateString('sv-SE');
};

const getEndOfWeek = () => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diffToMonday = (dayOfWeek + 6) % 7;
  const sunday = new Date(now);
  sunday.setDate(now.getDate() + (6 - diffToMonday));
  sunday.setHours(23, 59, 59, 999);
  return sunday.toLocaleDateString('sv-SE');
};

const getStartOfMonth = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  return start.toLocaleDateString('sv-SE');
};

const getEndOfMonth = () => {
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Day 0 of next month = last day of this month
  return end.toLocaleDateString('sv-SE');
};

const getToday = () => {
  return new Date().toLocaleDateString('sv-SE');
};

const DashBoard = () => {
  const axiosPrivate = useAxiosPrivate();
  const {
    data: todayData,
    isError: todayError,
    isLoading: todayLoading,
  } = useQuery({
    queryKey: ['getOverallStats', getToday(), getToday()],
    queryFn: async () => {
      const response = await axiosPrivate.get(
        `SalesData/getOverallStats?since=${getToday()}&until=${getToday()}`,
      );
      return response.data;
    },
  });
  const {
    data: weekData,
    isError: weekError,
    isLoading: weekLoading,
  } = useQuery({
    queryKey: ['getOverallStats', getStartOfWeek(), getEndOfWeek()],
    queryFn: async () => {
      const response = await axiosPrivate.get(
        `SalesData/getOverallStats?since=${getStartOfWeek()}&until=${getEndOfWeek()}`,
      );
      return response.data;
    },
  });
  const {
    data: monthData,
    isError: monthError,
    isLoading: monthLoading,
  } = useQuery({
    queryKey: ['getOverallStats', getStartOfMonth(), getEndOfMonth()],
    queryFn: async () => {
      const response = await axiosPrivate.get(
        `SalesData/getOverallStats?since=${getStartOfMonth()}&until=${getEndOfMonth()}`,
      );
      return response.data;
    },
  });
  return (
    <Box sx={{ mb: 4 }}>
      <Box gap={4} display="flex" flexDirection="column">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="stretch"
          gap={4}
          sx={{ mt: 4 }}
        >
          <Paper
            sx={{
              p: 4,
              borderRadius: 2,
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <BarChartWrapper
              url={'SalesData/soldSum'}
              queryObject={{
                since: new Date().toLocaleDateString('sv-SE'),
                until: new Date().toLocaleDateString('sv-SE'),
                interval: 'day',
              }}
              title={'Rowery sprzedane dzisiaj'}
              dataKey={'date'}
            >
              <BarChart
                series={[]}
                barLabel={'value'}
                height={400}
                grid={{ horizontal: true }}
              />
            </BarChartWrapper>
          </Paper>
          <Paper
            sx={{
              p: 4,
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6" component="h2" fontWeight="bold">
              Historia
            </Typography>
            <ShortSaleHistoryTable />
          </Paper>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="stretch"
          gap={4}
          sx={{ mt: 4 }}
        >
          <Paper
            sx={{
              p: 4,
              borderRadius: 2,
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <BarChartWrapper
              isStackedByDefault={false}
              url={'SalesData/soldSum'}
              queryObject={{
                since: getStartOfWeek(),
                until: getEndOfWeek(),
                interval: 'day',
              }}
              title={'Rowery sprzedane w tym tygodniu'}
              dataKey={'date'}
              seriesProps={{ showMark: false, curve: 'linear' }}
            >
              <LineChart
                series={[]}
                height={400}
                grid={{ vertical: true, horizontal: true }}
              />
            </BarChartWrapper>
          </Paper>
          <Paper
            sx={{
              p: 4,
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Box gap={2} display="flex" flexDirection="column">
              <Typography variant="h6" component="h2" fontWeight="bold">
                Podsumowanie
              </Typography>
              <Box display="flex" justifyContent="space-between" gap={8}>
                <Typography>Sprzedaż dzisiaj</Typography>
                <Typography>{todayData?.sum ?? ''} PLN</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" gap={8}>
                <Typography>Ilość rowerów dzisiaj</Typography>
                <Typography>{todayData?.count ?? ''}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" gap={8}>
                <Typography>Sprzedaż tygodnia</Typography>
                <Typography>{weekData?.sum ?? ''} PLN</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" gap={8}>
                <Typography>Ilość rowerów w tym tygodniu</Typography>
                <Typography>{weekData?.count ?? ''}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" gap={8}>
                <Typography>Sprzedaż miesiąca</Typography>
                <Typography>{monthData?.sum ?? ''} PLN</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" gap={8}>
                <Typography>Ilość rowerów w tym miesiącu</Typography>
                <Typography>{monthData?.count ?? ''}</Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default DashBoard;
