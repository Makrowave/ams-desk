'use client';
import ShortSaleHistoryTable from '../../components/table/stats/ShortSaleHistoryTable';
import BarChartWrapper from '../../components/charts/BarChartWrapper';
import { BarChart, LineChart } from '@mui/x-charts';
import { Box, Paper, Typography } from '@mui/material';
import { getStartOfWeek, getEndOfWeek } from '../../hooks/statsHooks';
import StatsSummary from '../../components/charts/StatsSummary';

const DashBoard = () => {
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
            <StatsSummary />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default DashBoard;
