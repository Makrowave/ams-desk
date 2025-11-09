import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SelectOption, SelectOptionWithColor } from '../../types/selectTypes';

type DataSelectProps = {
  defaultValue: number;
  defaultName?: string;
  value: number;
  onChange: (value: number) => void;
  options: SelectOption[];
  label: string;
  validated?: boolean;
  adornment?: JSX.Element;
  disabled?: boolean;
  error?: boolean;
};

const DataSelect = ({
  defaultValue,
  defaultName,
  value,
  onChange,
  options,
  label,
  validated,
  adornment,
  disabled,
  error,
}: DataSelectProps): JSX.Element => {
  const isColored =
    options[0] !== undefined
      ? Object.keys(options[0]).includes('hexCode')
      : false;

  return (
    <FormControl fullWidth>
      <InputLabel id={label}>{label}</InputLabel>
      <Select
        error={error !== undefined ? error : validated ? value === 0 : false}
        value={value}
        onChange={(event) => {
          onChange(Number(event.target.value));
        }}
        labelId={label}
        label={label}
        endAdornment={adornment}
        disabled={disabled}
      >
        <MenuItem value={defaultValue}>
          <MenuItemChild
            option={{
              id: defaultValue,
              name: defaultName ?? (validated ? 'Wybierz' : 'Dowolny'),
            }}
            isColored={isColored}
          />
        </MenuItem>
        {options.map((option) => (
          <MenuItem value={option.id} key={String(option.id)}>
            <MenuItemChild option={option} isColored={isColored} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export { DataSelect };

const MenuItemChild = ({
  option,
  isColored,
}: {
  option: SelectOption | SelectOptionWithColor;
  isColored: boolean;
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {isColored && (
        <Box
          sx={{
            backgroundColor:
              ((option as SelectOptionWithColor)?.color as string) ?? '#ffffff',
            width: 20,
            height: 20,
          }}
        />
      )}
      {option.name}
    </Box>
  );
};
