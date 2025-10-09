import { useState } from 'react';
import Filters, { defaultFilters } from './Filters';
import { Paper, Stack } from '@mui/material';
import NewModelTable from './NewModelTable';
import { appBarHeight } from '@/styles/layout';

export default function FilterModelTable() {
  const [query, setQuery] = useState(defaultFilters);
  return (
    <Stack sx={{ height: `calc(100vh - ${appBarHeight}px)` }} direction={'row'}>
      <Filters setQuery={setQuery} />
      <Paper
        sx={{
          m: 2,
          display: 'flex',
          flexDirection: 'column',
          // width: "full",
          overflowX: 'auto',
          flex: 5,
        }}
      >
        <NewModelTable filters={query} />
      </Paper>
    </Stack>
  );
}
