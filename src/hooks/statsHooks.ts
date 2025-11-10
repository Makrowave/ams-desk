import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './useAxiosPrivate';

export const getStartOfWeek = () => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diffToMonday = (dayOfWeek + 6) % 7;
  const monday = new Date(now);
  monday.setDate(now.getDate() - diffToMonday);
  monday.setHours(0, 0, 0, 0);
  return monday.toLocaleDateString('sv-SE');
};

export const getEndOfWeek = () => {
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

export const useDailyStats = () => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ['getOverallStats', getToday(), getToday()],
    queryFn: async () => {
      const response = await axiosPrivate.get(
        `SalesData/getOverallStats?since=${getToday()}&until=${getToday()}`,
      );
      return response.data;
    },
  });
};
export const useWeeklyStats = () => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ['getOverallStats', getStartOfWeek(), getEndOfWeek()],
    queryFn: async () => {
      const response = await axiosPrivate.get(
        `SalesData/getOverallStats?since=${getStartOfWeek()}&until=${getEndOfWeek()}`,
      );
      return response.data;
    },
  });
};

export const useMonthlyStats = () => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ['getOverallStats', getStartOfMonth(), getEndOfMonth()],
    queryFn: async () => {
      const response = await axiosPrivate.get(
        `SalesData/getOverallStats?since=${getStartOfMonth()}&until=${getEndOfMonth()}`,
      );
      return response.data;
    },
  });
};
