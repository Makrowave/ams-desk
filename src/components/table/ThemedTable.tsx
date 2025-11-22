import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import {
  MaterialReactTable,
  MaterialReactTableProps,
  MRT_RowData,
} from 'material-react-table';
import { themeOptions } from '../../styles/theme';
import { createTheme, ThemeOptions } from '@mui/material';

const ThemedTable = <TData extends MRT_RowData>(
  props: MaterialReactTableProps<TData>,
) => {
  const tableTheme: ThemeOptions = {
    ...themeOptions,
    palette: {
      ...themeOptions.palette,
      background: {
        default: '#FFFFFF',
        paper: '#FFFFFF',
      },
    },
  };

  const theme = createTheme(tableTheme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MaterialReactTable {...props} />
    </ThemeProvider>
  );
};

export default ThemedTable;
