'use client';
import SaleHistoryTable from '@/components/table/stats/SaleHistoryTable';
import { useState } from 'react';
import TimeSelector from '@/components/charts/TimeSelector';

export default function SaleHistoryPage() {
  const [interval, setInterval] = useState('day');
  const [since, setSince] = useState(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString('sv-SE'),
  );
  const [until, setUntil] = useState(new Date().toLocaleDateString('sv-SE'));

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
      <SaleHistoryTable since={since} until={until} />
    </>
  );
}
