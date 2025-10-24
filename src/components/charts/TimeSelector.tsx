import { Box, Button, MenuItem, Paper, Select } from '@mui/material';
import { DateCalendar, DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Dispatch, SetStateAction, useState } from 'react';

export type TimeSelectorProps = {
  interval: string;
  setInterval: (value: string) => void;
  since: string | null;
  setSince: Dispatch<SetStateAction<string | null>>;
  until: string | null;
  setUntil: Dispatch<SetStateAction<string | null>>;
};

const TimeSelector = ({
  interval,
  setInterval,
  since,
  setSince,
  until,
  setUntil,
}: TimeSelectorProps) => {
  const [selectedInterval, setSelectedInterval] = useState(3);
  const setLatestInterval = (days: number) => {
    setSince(
      new Date(Date.now() - days * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0] ?? null,
    );
    setUntil(new Date().toISOString().split('T')[0] ?? null);
  };

  return (
    <Paper
      sx={{
        mb: 4,
        p: 2,
        display: 'flex',
        flexWrap: 'wrap',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        alignItems: 'center',
        gap: 2,
      }}
      elevation={4}
    >
      <Select value={interval} onChange={(e) => setInterval(e.target.value)}>
        <MenuItem value={'day'}>Dzień</MenuItem>
        <MenuItem value={'month'}>Miesiąc</MenuItem>
        <MenuItem value={'year'}>Rok</MenuItem>
      </Select>
      <DatePicker
        value={since ? dayjs(since) : null}
        onChange={(v) => {
          setSince(v?.format('DD-MM-YYYY') ?? null);
          setSelectedInterval(0);
        }}
        label="Od"
        slotProps={{
          textField: {
            error: false,
          },
        }}
      />
      <DatePicker
        value={until ? dayjs(until) : null}
        onChange={(v) => {
          setUntil(v?.format('DD-MM-YYYY') ?? null);
          setSelectedInterval(0);
        }}
        label="Do"
        slotProps={{
          textField: {
            error: false,
          },
        }}
      />
      <Button
        sx={{ height: '56px' }}
        color="secondary"
        variant={selectedInterval === 1 ? 'contained' : 'outlined'}
        className="button-primary"
        onClick={() => {
          setSelectedInterval(1);
          setLatestInterval(0);
        }}
      >
        Dziś
      </Button>
      <Button
        sx={{ height: '56px' }}
        color="secondary"
        variant={selectedInterval === 2 ? 'contained' : 'outlined'}
        className="button-primary"
        onClick={() => {
          setSelectedInterval(2);
          setLatestInterval(7);
        }}
      >
        Tydzień
      </Button>
      <Button
        sx={{ height: '56px' }}
        color="secondary"
        variant={selectedInterval === 3 ? 'contained' : 'outlined'}
        className="button-primary"
        onClick={() => {
          setSelectedInterval(3);
          setLatestInterval(30);
        }}
      >
        30 dni
      </Button>
      <Button
        sx={{ height: '56px' }}
        color="secondary"
        variant={selectedInterval === 4 ? 'contained' : 'outlined'}
        className="button-primary"
        onClick={() => {
          setSelectedInterval(4);
          setLatestInterval(60);
        }}
      >
        60 dni
      </Button>
      <Button
        sx={{ height: '56px' }}
        color="secondary"
        variant={selectedInterval === 5 ? 'contained' : 'outlined'}
        className="button-primary"
        onClick={() => {
          setSelectedInterval(5);
          setLatestInterval(90);
        }}
      >
        90 dni
      </Button>
      <Button
        sx={{ height: '56px' }}
        color="secondary"
        variant={selectedInterval === 6 ? 'contained' : 'outlined'}
        className="button-primary"
        onClick={() => {
          setSelectedInterval(6);
          setLatestInterval(365);
        }}
      >
        Rok
      </Button>
      <Button
        sx={{ height: '56px' }}
        color="secondary"
        variant={selectedInterval === 7 ? 'contained' : 'outlined'}
        className="button-primary"
        onClick={() => {
          setSelectedInterval(7);
          setSince('');
          setUntil('');
        }}
      >
        Zawsze
      </Button>
      <Button
        sx={{ height: '56px' }}
        color="secondary"
        variant={selectedInterval === 8 ? 'contained' : 'outlined'}
        className="button-primary"
        onClick={() => {
          setSelectedInterval(8);
          const firstCurrent = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1,
          ).toLocaleDateString('sv-SE');
          const lastCurrent = new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            0,
          ).toLocaleDateString('sv-SE');
          setSince(firstCurrent);
          setUntil(lastCurrent);
        }}
      >
        Bieżący miesiąc
      </Button>
      <Button
        sx={{ height: '56px' }}
        color="secondary"
        variant={selectedInterval === 9 ? 'contained' : 'outlined'}
        className="button-primary"
        onClick={() => {
          setSelectedInterval(9);
          const firstPrev = new Date(
            new Date().getFullYear(),
            new Date().getMonth() - 1,
            1,
          ).toLocaleDateString('sv-SE');
          const lastPrev = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            0,
          ).toLocaleDateString('sv-SE');
          setSince(firstPrev);
          setUntil(lastPrev);
        }}
      >
        Poprzedni miesiąc
      </Button>
    </Paper>
  );
};

export default TimeSelector;
