'use client';
import { DataSelect } from '../input/DataSelect';
import { createQueryHook } from '../../hooks/queryHooks';
import { URLKEYS } from '../../util/urls';
import { SelectOption } from '../../types/selectTypes';
import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import { Refresh } from '@mui/icons-material';

type FetchSelectProps = {
  urlKey: keyof typeof URLKEYS;
  params?: Record<string, any> | null;
  value: number;
  onChange: (value: number) => void;
  label: string;
  defaultValue: number;
  defaultName?: string;
  validated?: boolean;
};

const FetchSelect = <T extends SelectOption>({
  urlKey,
  params = null,
  value,
  onChange,
  label,
  defaultValue,
  defaultName,
  validated,
}: FetchSelectProps) => {
  const hook = createQueryHook(urlKey);
  const { data, isPending, isError, error, refetch } = hook<T[]>(params);

  const Adornment = () => {
    if (isPending)
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
          <CircularProgress size={20} />
        </Box>
      );

    if (isError)
      return (
        <IconButton color="error" onClick={() => refetch()}>
          <Refresh />
        </IconButton>
      );
  };

  const getName = () => {
    if (isError) return 'Błąd';
    if (isPending) return 'Ładowanie...';
    return defaultName;
  };

  return (
    <DataSelect
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      defaultName={getName()}
      options={data ?? []}
      label={label}
      validated={validated}
      adornment={<Adornment />}
      disabled={isPending}
    />
  );
};

export default FetchSelect;
