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

function SaleStatsPage() {
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
      <div className="bg-primary p-4 rounded-lg flex flex-col">
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
      </div>

      <div
        className={'bg-primary p-4 rounded-lg flex flex-col mt-8 items-center'}
      >
        <Collapsible
          // sx={{ width: '100%' }}
          title={'Sprzedane rowery ze względu na typ ramy'}
        >
          <div className="flex items-center w-full h-fit">
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
          </div>
        </Collapsible>
      </div>
      <div
        className={'bg-primary p-4 rounded-lg flex flex-col mt-8 items-center'}
      >
        <Collapsible
          // sx={{ width: '100%' }}
          title={'Sprzedane rowery ze względu na to czy są elektryczne'}
        >
          <div className="flex items-center w-full h-fit">
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
          </div>
        </Collapsible>
      </div>
      <div className={'flex flex-wrap gap-8 mt-8'}>
        <div
          className={
            'bg-primary p-4 rounded-lg flex flex-col items-center min-w-[600px]'
          }
        >
          <BarChartWrapper
            url={'SalesData/getPlacesMedian'}
            queryObject={{ since: since, until: until }}
            title={'Cena sprzedanego roweru - mediana'}
            // className="border border-gray-200 rounded-lg p-2 w-full"
            dataKey={'date'}
          >
            <BarChart
              series={[]}
              barLabel={({ value }) => `${value}zł`}
              height={400}
              sx={sxBar}
            />
          </BarChartWrapper>
        </div>
        <div
          className={
            'bg-primary p-4 rounded-lg flex flex-col items-center min-w-[600px]'
          }
        >
          <BarChartWrapper
            url={'SalesData/getPlacesAverage'}
            queryObject={{ since: since, until: until }}
            title={'Cena sprzedanego roweru - średnia'}
            // className="border border-gray-200 rounded-lg p-2 w-full"
            dataKey={'date'}
          >
            <BarChart
              series={[]}
              barLabel={({ value }) => `${value?.toFixed(2) ?? '0.00'}zł`}
              height={400}
              sx={sxBar}
            />
          </BarChartWrapper>
        </div>
        <div
          className={
            'bg-primary p-4 rounded-lg flex flex-col items-center min-w-[600px]'
          }
        >
          <BarChartWrapper
            url={'SalesData/getPlacesMedianDiscount'}
            queryObject={{ since: since, until: until }}
            title={'Procent udzielonej zniżki - mediana'}
            // className="border border-gray-200 rounded-lg p-2 w-full"
            dataKey={'date'}
          >
            <BarChart
              series={[]}
              barLabel={({ value }) => `${value}%`}
              height={400}
              sx={sxBar}
            />
          </BarChartWrapper>
        </div>
        <div
          className={
            'bg-primary p-4 rounded-lg flex flex-col items-center min-w-[600px]'
          }
        >
          <BarChartWrapper
            url={'SalesData/getPlacesSum'}
            queryObject={{ since: since, until: until }}
            title={'Całkowita sprzedaż'}
            // className="border border-gray-200 rounded-lg p-2 w-full"
            dataKey={'date'}
          >
            <BarChart
              series={[]}
              barLabel={({ value }) => `${value}zł`}
              height={400}
              sx={sxBar}
            />
          </BarChartWrapper>
        </div>
      </div>
    </>
  );
}

export default SaleStatsPage;
