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
      <div
        className={'bg-primary p-4 rounded-lg flex flex-col mt-8 items-center'}
      >
        <Collapsible title={'Sprzedane rowery ze względu na kategorię'}>
          <div className="flex justify-center items-center w-full h-fit">
            <PieChartWrapper
              url={'SalesData/getCategoryStats'}
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
              url={'SalesData/getCategoryStats'}
              queryObject={{ since: since, until: until }}
              title={'Przychód'}
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
          </div>
        </Collapsible>
      </div>
      <div className="flex gap-80 mt-8">
        <Collapsible
          // className={
          //   'flex flex-col gap-8 items-center p-4 bg-primary flex-1 rounded-lg self-start'
          // }
          title={'Ilość sprzedanych rowerów wg. kategorii'}
          initialOpen={false}
        >
          {!placesQuery.isLoading &&
            !placesQuery.isError &&
            placesQuery.data!.map((place) => (
              <div
                key={place.id}
                className={'p-4 flex flex-col items-center min-w-[600px]'}
              >
                <BarChartWrapper
                  url={'SalesData/mostPopularCategoryByPlace'}
                  queryObject={{
                    since: since,
                    until: until,
                    isCount: true,
                    placeId: place.id,
                  }}
                  title={place.name}
                  // className="border border-gray-200 rounded-lg p-2 w-full"
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
              </div>
            ))}
        </Collapsible>
        <Collapsible title={'Sprzedaż wg. kategorii'} initialOpen={false}>
          {!placesQuery.isLoading &&
            !placesQuery.isError &&
            placesQuery.data!.map((place) => (
              <div
                key={place.id}
                className={'p-4 flex flex-col items-center min-w-[600px]'}
              >
                <BarChartWrapper
                  url={'SalesData/mostPopularCategoryByPlace'}
                  queryObject={{
                    since: since,
                    until: until,
                    isCount: false,
                    placeId: place.id,
                  }}
                  title={place.name}
                  // className="border border-gray-200 rounded-lg p-2 w-full"
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
              </div>
            ))}
        </Collapsible>
      </div>
    </>
  );
}
