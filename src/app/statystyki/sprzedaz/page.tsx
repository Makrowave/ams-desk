'use client';
import {
  BarChart,
  barLabelClasses,
  pieArcLabelClasses,
  PieChart,
} from '@mui/x-charts';
import { useState } from 'react';
import BarChartWrapper from '../../../components/charts/BarChartWrapper';
import PieChartWrapper from '../../../components/charts/PieChartWrapper';
import TimeSelector from '../../../components/charts/TimeSelector';
import Collapsible from '../../../components/Collapsible';
import { Box, Card, Paper, Stack } from '@mui/material';

const SaleStatsPage = () => {
  const [interval, setInterval] = useState('day');
  const [since, setSince] = useState<string | null>(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString('sv-SE'),
  );
  const [until, setUntil] = useState<string | null>(
    new Date().toLocaleDateString('sv-SE'),
  );

  const sxPie = {
    [`& .${pieArcLabelClasses.root}`]: {
      fontWeight: 'bold',
      fontSize: '14px',
      fill: 'white',
    },
  };
  const sxBar = {
    [`& .${barLabelClasses.root}`]: {
      fontSize: '14px',
      fill: 'white',
    },
  };
  return (
    <>
      <TimeSelector
        interval={interval}
        setInterval={setInterval}
        since={since}
        setSince={setSince}
        until={until}
        setUntil={setUntil}
      />
      <Paper sx={{ p: 4 }}>
        <BarChartWrapper
          url={'SalesData/soldSum'}
          isStackedByDefault
          collapsible
          queryObject={{ since: since, until: until, interval: interval }}
          title={'Wartość sprzedanych rowerów w czasie'}
          dataKey={'date'}
        >
          <BarChart
            series={[]}
            barLabel={interval === 'day' ? () => '' : 'value'}
            height={400}
          />
        </BarChartWrapper>
      </Paper>
      <Paper sx={{ p: 4, mt: 4 }} component={Stack}>
        <Collapsible title={'Sprzedane rowery ze względu na typ ramy'}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 4,
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 2,
              px: 2,
            }}
          >
            <PieChartWrapper
              url={'SalesData/getFrameTypeStats'}
              showsQuantity
              queryObject={{ since: since, until: until }}
              title={'Ilość'}
              className={'border-gray-200 border rounded-lg p-2 mx-auto'}
            >
              <PieChart
                series={[]}
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    fontWeight: 'bold',
                    fontSize: '14px',
                    fill: 'white',
                  },
                }}
                width={600}
                height={400}
              />
            </PieChartWrapper>
            <PieChartWrapper
              url={'SalesData/getFrameTypeStats'}
              queryObject={{ since: since, until: until }}
              title={'Przychód'}
              // className={'border-gray-200 border rounded-lg p-2 mx-auto'}
            >
              <PieChart
                series={[]}
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    fontWeight: 'bold',
                    fontSize: '14px',
                    fill: 'white',
                  },
                }}
                width={600}
                height={400}
              />
            </PieChartWrapper>
          </Box>
        </Collapsible>
      </Paper>
      <Paper sx={{ p: 4, mt: 4 }} component={Stack}>
        <Collapsible
          // sx={{ width: '100%' }}
          title={'Sprzedane rowery ze względu na to czy są elektryczne'}
        >
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 4,
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 2,
              px: 2,
            }}
          >
            <PieChartWrapper
              url={'SalesData/getElectricShare'}
              showsQuantity
              queryObject={{ since: since, until: until }}
              title={'Ilość'}
              className={'border-gray-200 border rounded-lg p-2 mx-auto'}
            >
              <PieChart
                series={[]}
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    fontWeight: 'bold',
                    fontSize: '14px',
                    fill: 'white',
                  },
                }}
                width={600}
                height={400}
              />
            </PieChartWrapper>
            <PieChartWrapper
              url={'SalesData/getElectricShare'}
              queryObject={{ since: since, until: until }}
              title={'Przychód'}
              className={'border-gray-200 border rounded-lg p-2 mx-auto'}
            >
              <PieChart series={[]} sx={sxPie} width={600} height={400} />
            </PieChartWrapper>
          </Box>
        </Collapsible>
      </Paper>
      <Paper
        sx={{
          gap: 8,
          mt: 4,
          display: 'flex',
          flexWrap: 'wrap',
          p: 4,
          justifyContent: 'space-evenly',
          mb: 4,
        }}
      >
        <Card>
          <BarChartWrapper
            url={'SalesData/getPlacesMedian'}
            queryObject={{ since: since, until: until }}
            title={'Cena sprzedanego roweru - mediana'}
            dataKey={'date'}
          >
            <BarChart
              series={[]}
              barLabel={({ value }) => `${value}zł`}
              height={400}
              sx={sxBar}
            />
          </BarChartWrapper>
        </Card>
        <Card>
          <BarChartWrapper
            url={'SalesData/getPlacesAverage'}
            queryObject={{ since: since, until: until }}
            title={'Cena sprzedanego roweru - średnia'}
            dataKey={'date'}
          >
            <BarChart
              series={[]}
              barLabel={({ value }) => `${value?.toFixed(2) ?? '0.00'}zł`}
              height={400}
              sx={sxBar}
            />
          </BarChartWrapper>
        </Card>
        <Card
          className={
            'bg-primary p-4 rounded-lg flex flex-col items-center min-w-[600px]'
          }
        >
          <BarChartWrapper
            url={'SalesData/getPlacesMedianDiscount'}
            queryObject={{ since: since, until: until }}
            title={'Procent udzielonej zniżki - mediana'}
            dataKey={'date'}
          >
            <BarChart
              series={[]}
              barLabel={({ value }) => `${value}%`}
              height={400}
              sx={sxBar}
            />
          </BarChartWrapper>
        </Card>
        <Card>
          <BarChartWrapper
            url={'SalesData/getPlacesSum'}
            queryObject={{ since: since, until: until }}
            title={'Całkowita sprzedaż'}
            dataKey={'date'}
          >
            <BarChart
              series={[]}
              barLabel={({ value }) => `${value}zł`}
              height={400}
              sx={sxBar}
            />
          </BarChartWrapper>
        </Card>
      </Paper>
    </>
  );
};

export default SaleStatsPage;
