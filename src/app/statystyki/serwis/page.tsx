'use client';
import { BarChart, barLabelClasses, pieArcLabelClasses } from '@mui/x-charts';
import { useState } from 'react';
import BarChartWrapper from '../../../components/charts/BarChartWrapper';
import TimeSelector from '../../../components/charts/TimeSelector';

function RepairStatsPage() {
  const [interval, setInterval] = useState('day');
  const [since, setSince] = useState<string | null>(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString('sv-SE'),
  );
  const [until, setUntil] = useState<string | null>(
    new Date().toLocaleDateString('sv-SE'),
  );

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
          url={'RepairsData/repairsSum'}
          isStackedByDefault
          collapsible
          queryObject={{ since: since, until: until, interval: interval }}
          title={'Wartość z serwisów w czasie'}
          dataKey={'date'}
        >
          <BarChart
            series={[]}
            barLabel={interval === 'day' ? () => '' : 'value'}
            height={400}
          />
        </BarChartWrapper>
      </div>
    </>
  );
}

export default RepairStatsPage;
``;
