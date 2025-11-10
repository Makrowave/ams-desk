'use client';

import { Box, Card, Paper, Stack, Typography } from '@mui/material';
import PrivateRoute from '../components/routing/PrivateRoute';
import StatsSummary from '../components/charts/StatsSummary';
import ShortSaleHistoryTable from '../components/table/stats/ShortSaleHistoryTable';
import BarChartWrapper from '../components/charts/BarChartWrapper';
import { BarChart } from '@mui/x-charts';

export default function Home() {
  return (
    <PrivateRoute>
      <Paper component={Stack} elevation={3} sx={{ margin: 2, p: 4 }}>
        <Typography variant="h4" component="h1">
          Witaj w AMS Desk
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 4,
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            mt: 4,
          }}
        >
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" component="h2" fontWeight="bold">
              Historia
            </Typography>
            <ShortSaleHistoryTable />
          </Card>
          <Card sx={{ p: 2 }}>
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
          </Card>
          <Card sx={{ p: 2 }}>
            <StatsSummary />
          </Card>
        </Box>
      </Paper>
    </PrivateRoute>
  );
}
