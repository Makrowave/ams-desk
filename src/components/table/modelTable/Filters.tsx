import FetchSelect from '../../filtering/FetchSelect';
import useAuth from '../../../hooks/useAuth';
import { Dispatch, SetStateAction, useEffect, useReducer } from 'react';
import { DataSelect } from '../../input/DataSelect';
import { URLKEYS } from '../../../util/urls';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import useAsyncRangeSlider from '../../../hooks/useAsyncRangeSlider';

type FiltersProps = {
  setQuery: Dispatch<SetStateAction<FiltersType>>;
  place: number;
  setPlace: Dispatch<SetStateAction<number>>;
};

const Filters = ({ setQuery, place, setPlace }: FiltersProps) => {
  // Create a ref to store the reset function
  const resetRef = { current: () => {} };

  const [filters, dispatch] = useReducer(
    createReducer(() => resetRef.current()),
    defaultFilters,
  );

  const updateFilters = (
    field: keyof FiltersType,
    value: FiltersType[keyof FiltersType],
  ) => {
    console.log('Dispatching:', field, value);
    if (field === undefined) return;
    dispatch({ type: 'SET', field, value });
  };

  const { rangeInput, reset } = useAsyncRangeSlider({
    minValue: filters.minPrice,
    maxValue: filters.maxPrice,
    title: 'Cena',
    setMin: (v) => updateFilters('minPrice', v),
    setMax: (v) => updateFilters('maxPrice', v),
    step: 250,
    min: defaultFilters.minPrice,
    max: defaultFilters.maxPrice,
  });

  // Update the ref with the actual reset function
  resetRef.current = reset;
  const { isAdmin } = useAuth();
  useEffect(() => {
    setQuery(filters);
  });

  return (
    <Paper
      sx={{
        pb: 4,
        px: 4,
        m: 2,
        mr: 0,
        flex: 1,
        minWidth: '350px',
        overflowY: 'auto',
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          backgroundColor: '#ffffff',
          zIndex: 10,
          p: 2,
          pt: 4,
          mb: 2,
          borderBottom: '1px solid #ccc',
        }}
      >
        <Typography variant="h6">Filtry</Typography>
      </Box>
      <Stack component={'form'} spacing={2}>
        <FetchSelect
          value={place}
          onChange={setPlace}
          urlKey={URLKEYS.Places}
          defaultName="Dowolne"
          label="Miejsce"
          defaultValue={defaultFilters.place}
        />
        <TextField
          label="Nazwa"
          value={filters.name}
          onChange={(e) => updateFilters('name', e.target.value)}
        />
        <TextField
          label="Kod producenta"
          value={filters.productCode}
          onChange={(e) => updateFilters('productCode', e.target.value)}
        />
        <TextField
          label="Rozmiar"
          value={filters.frameSize}
          onChange={(e) => updateFilters('frameSize', e.target.value)}
        />
        <FetchSelect
          value={filters.wheelSize}
          onChange={(v) => updateFilters('wheelSize', v)}
          urlKey={URLKEYS.WheelSizes}
          label="Rozmiar koła"
          defaultValue={defaultFilters.wheelSize}
        />
        <DataSelect
          label="Typ ramy"
          value={filters.isWoman}
          defaultValue={defaultFilters.isWoman}
          onChange={(v) => updateFilters('isWoman', v)}
          options={[
            { id: 1, name: 'Męski' },
            { id: 2, name: 'Damski' },
          ]}
        />

        <FetchSelect
          value={filters.manufacturerId}
          onChange={(v) => updateFilters('manufacturerId', v)}
          urlKey={URLKEYS.Manufacturers}
          label="Producent"
          defaultValue={defaultFilters.manufacturerId}
        />

        <FetchSelect
          value={filters.categoryId}
          onChange={(v) => updateFilters('categoryId', v)}
          urlKey={URLKEYS.Categories}
          label="Kategoria"
          defaultValue={defaultFilters.categoryId}
        />

        <FetchSelect
          value={filters.colorId}
          onChange={(v) => updateFilters('colorId', v)}
          urlKey={URLKEYS.Colors}
          label="Kolor"
          defaultValue={defaultFilters.colorId}
        />

        <FetchSelect
          value={filters.statusId}
          onChange={(v) => updateFilters('statusId', v)}
          urlKey={URLKEYS.ExcludedStatuses}
          params={{ exclude: [3] }}
          label="Status"
          defaultValue={defaultFilters.statusId}
        />
        {rangeInput}
        <FormControlLabel
          control={<Checkbox />}
          checked={filters.available}
          onChange={() => dispatch({ type: 'TOGGLE', field: 'available' })}
          label="Dostępny"
        />
        <FormControlLabel
          control={<Checkbox />}
          checked={filters.electric}
          onChange={() => dispatch({ type: 'TOGGLE', field: 'electric' })}
          label="Elektryczny"
        />
        <FormControlLabel
          control={<Checkbox />}
          checked={filters.isKids}
          onChange={() => dispatch({ type: 'TOGGLE', field: 'isKids' })}
          label="Dziecięcy"
        />
        {isAdmin && (
          <>
            <span>Braki</span>
            <FormControlLabel
              control={<Checkbox />}
              checked={filters.noEan}
              onChange={() => dispatch({ type: 'TOGGLE', field: 'noEan' })}
              label="Bez kodu EAN"
            />
            <FormControlLabel
              control={<Checkbox />}
              checked={filters.noProductCode}
              onChange={() => {
                dispatch({ type: 'TOGGLE', field: 'noProductCode' });
                dispatch({ type: 'SET', field: 'productCode', value: '' });
              }}
              label="Bez kodu producenta"
            />
            <FormControlLabel
              control={<Checkbox />}
              checked={filters.noColorGroup}
              onChange={() =>
                dispatch({ type: 'TOGGLE', field: 'noColorGroup' })
              }
              label="Bez koloru"
            />
            <FormControlLabel
              control={<Checkbox />}
              checked={filters.noColor}
              onChange={() => dispatch({ type: 'TOGGLE', field: 'noColor' })}
              label="Bez podglądu kolorów"
            />
          </>
        )}
        <Button
          variant={'contained'}
          color={'primary'}
          onClick={() => dispatch({ type: 'RESET' })}
        >
          Reset
        </Button>
      </Stack>
    </Paper>
  );
};

export const defaultFilters = {
  name: '',
  frameSize: '',
  wheelSize: 0,
  available: true,
  electric: false,
  isWoman: 0,
  manufacturerId: 0,
  place: 0,
  isKids: false,
  categoryId: 0,
  minPrice: 0,
  maxPrice: 40000,
  colorId: 0,
  statusId: 0,
  productCode: '',
  noEan: false,
  noProductCode: false,
  noColor: false,
  noColorGroup: false,
};

export const prepareFilters = (filters: typeof defaultFilters) => {
  const entries = Object.entries(filters) as [
    keyof typeof defaultFilters,
    (typeof defaultFilters)[keyof typeof defaultFilters],
  ][];

  return Object.fromEntries(
    entries.map(([key, value]) => {
      if (key === 'isWoman') {
        if (value === 1) return [key, 'false'];
        return [key, 'true'];
      }
      if (key !== 'minPrice' && key !== 'maxPrice' && value === 0) {
        return [key, undefined];
      }
      return [key, value];
    }),
  );
};

export type FiltersType = typeof defaultFilters;

type ReducerAction =
  | {
      type: 'SET';
      field: keyof FiltersType;
      value: FiltersType[keyof FiltersType];
    }
  | {
      type: 'TOGGLE';
      field: keyof FiltersType;
    }
  | {
      type: 'RESET';
    };

const createReducer = (reset: () => void) => {
  return (state: FiltersType, action: ReducerAction) => {
    switch (action.type) {
      case 'SET':
        return {
          ...state,
          [action.field]: action.value,
        };
      case 'TOGGLE':
        return {
          ...state,
          [action.field]: !state[action.field],
        };
      case 'RESET':
        reset();
        return defaultFilters;
      default:
        return state;
    }
  };
};

export default Filters;
