import { useState } from 'react';
import Filters, { defaultFilters } from './Filters';
import { Paper, Stack } from '@mui/material';
import ModelTable from './ModelTable';
import { appBarHeight } from '../../../styles/layout';

const FilterModelTable = () => {
  const [query, setQuery] = useState(defaultFilters);

  return (
    <Stack sx={{ height: `calc(100vh - ${appBarHeight}px)` }} direction={'row'}>
      <Filters setQuery={setQuery} />
      <Paper
        sx={{
          m: 2,
          display: 'flex',
          flexDirection: 'column',
          overflowX: 'auto',
          overflowY: 'auto',
          flex: 5,
        }}
      >
        <ModelTable filters={query} />
      </Paper>
    </Stack>
  );
};

export default FilterModelTable;
