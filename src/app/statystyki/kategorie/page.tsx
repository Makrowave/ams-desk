'use client';
import TimeSelector from '../../../components/charts/TimeSelector';
import { useState } from 'react';
import {
  BarChart,
  barLabelClasses,
  pieArcLabelClasses,
  PieChart,
} from '@mui/x-charts';
import BarChartWrapper from '../../../components/charts/BarChartWrapper';
import Collapsible from '../../../components/Collapsible';
import PieChartWrapper from '../../../components/charts/PieChartWrapper';
import { usePlacesQuery } from '../../../hooks/queryHooks';
import { Place } from '../../../types/filterTypes';
import { Box, Paper, Stack } from '@mui/material';

export default function CategoriesStats({}) {
  const [interval, setInterval] = useState('day');
  const [since, setSince] = useState<string | null>(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString('sv-SE'),
  );
  const [until, setUntil] = useState<string | null>(
    new Date().toLocaleDateString('sv-SE'),
  );
  const placesQuery = usePlacesQuery<Place[]>();

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
      <Stack sx={{ gap: 4, mb: 4 }}>
        <Paper sx={{ p: 2 }}>
          <Collapsible title={'Sprzedane rowery ze względu na kategorię'}>
            <Box
              sx={{
                display: 'flex',
                gap: 4,
                justifyContent: 'space-evenly',
                flexWrap: 'wrap',
                p: 2,
              }}
            >
              <PieChartWrapper
                url={'SalesData/getCategoryStats'}
                showsQuantity
                queryObject={{ since: since, until: until }}
                title={'Ilość'}
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
                url={'SalesData/getCategoryStats'}
                queryObject={{ since: since, until: until }}
                title={'Przychód'}
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
        <Paper sx={{ p: 2 }}>
          <Collapsible title={'Ilość sprzedanych rowerów wg. kategorii'}>
            <Box
              sx={{
                display: 'flex',
                gap: 4,
                justifyContent: 'space-evenly',
                flexWrap: 'wrap',
                p: 2,
              }}
            >
              {!placesQuery.isLoading &&
                !placesQuery.isError &&
                placesQuery.data!.map((place) => (
                  <Box key={place.id} sx={{ flex: 1, minWidth: 500 }}>
                    <BarChartWrapper
                      url={'SalesData/mostPopularCategoryByPlace'}
                      queryObject={{
                        since: since,
                        until: until,
                        isCount: true,
                        placeId: place.id,
                      }}
                      title={place.name}
                      dataKey={'place'}
                      hideSelectors
                    >
                      <BarChart
                        series={[]}
                        barLabel={({ value }) => `${value}`}
                        height={400}
                        sx={sxBar}
                      />
                    </BarChartWrapper>
                  </Box>
                ))}
            </Box>
          </Collapsible>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Collapsible title={'Sprzedaż wg. kategorii'}>
            <Box
              sx={{
                display: 'flex',
                gap: 4,
                p: 2,
                justifyContent: 'space-evenly',
                flexWrap: 'wrap',
              }}
            >
              {!placesQuery.isLoading &&
                !placesQuery.isError &&
                placesQuery.data!.map((place) => (
                  <Box key={place.id} sx={{ flex: 1, minWidth: 500 }}>
                    <BarChartWrapper
                      url={'SalesData/mostPopularCategoryByPlace'}
                      queryObject={{
                        since: since,
                        until: until,
                        isCount: false,
                        placeId: place.id,
                      }}
                      title={place.name}
                      dataKey={'place'}
                      hideSelectors
                    >
                      <BarChart
                        series={[]}
                        barLabel={({ value }) => `${value}zł`}
                        height={400}
                        sx={sxBar}
                      />
                    </BarChartWrapper>
                  </Box>
                ))}
            </Box>
          </Collapsible>
        </Paper>
      </Stack>
    </>
  );
}
