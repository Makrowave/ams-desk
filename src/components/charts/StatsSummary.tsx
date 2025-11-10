import { Box, Typography } from '@mui/material';
import {
  useDailyStats,
  useWeeklyStats,
  useMonthlyStats,
} from '../../hooks/statsHooks';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const StatsSummary = () => {
  const axiosPrivate = useAxiosPrivate();
  const {
    data: todayData,
    isError: todayError,
    isLoading: todayLoading,
  } = useDailyStats();

  const {
    data: weekData,
    isError: weekError,
    isLoading: weekLoading,
  } = useWeeklyStats();

  const {
    data: monthData,
    isError: monthError,
    isLoading: monthLoading,
  } = useMonthlyStats();

  return (
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
  );
};

export default StatsSummary;
