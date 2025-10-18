import FetchSelect from '../../filtering/FetchSelect';
import RangeInput from '../../filtering/RangeInput';
import useAuth from '../../../hooks/useAuth';
import { useEffect, useReducer } from 'react';
import { DataSelect } from '../../input/DataSelect';
import { URLKEYS } from '../../../util/urls';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

const Filters = ({ setQuery }) => {
  const updateFilters = (field, value) => {
    console.log('Dispatching:', field, value);
    if (field === undefined) return;
    dispatch({ type: 'SET', field, value });
  };
  const [filters, dispatch] = useReducer(reducer, defaultFilters);

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
      <FormGroup className={'flex-col gap-1.5'}>
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
            { key: 'false', value: 'Męski' },
            { key: 'true', value: 'Damski' },
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
          isColored
        />

        <FetchSelect
          value={filters.statusId}
          onChange={(v) => updateFilters('statusId', v)}
          urlKey={URLKEYS.ExcludedStatuses}
          params={{ exclude: [3] }}
          label="Status"
          defaultValue={defaultFilters.statusId}
          isColored
        />

        <RangeInput
          title="Cena"
          minValue={filters.minPrice}
          maxValue={filters.maxPrice}
          setMin={(v) => updateFilters('minPrice', v)}
          setMax={(v) => updateFilters('maxPrice', v)}
        />
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
      </FormGroup>
    </Paper>
  );
};

export const defaultFilters = {
  name: '',
  frameSize: '',
  wheelSize: '',
  available: true,
  electric: false,
  isWoman: '',
  manufacturerId: '',
  place: 0,
  isKids: false,
  categoryId: '',
  minPrice: 0,
  maxPrice: 100000,
  colorId: '',
  statusId: '',
  productCode: '',
  noEan: false,
  noProductCode: false,
  noColor: false,
  noColorGroup: false,
};
const reducer = (state, action) => {
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
      return defaultFilters;
    default:
      return state;
  }
};

export default Filters;
