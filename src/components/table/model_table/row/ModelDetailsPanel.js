import React from 'react';
import { BikeTable } from './BikeTable';
import { useColorsQuery } from '@/hooks/queryHooks';
import { FaBan } from 'react-icons/fa6';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';

export function ModelDetailsPanel({ model, placeId }) {
  const { data, isLoading } = useColorsQuery({ id: model.colorId.toString() });

  const Color = () => {
    if (isLoading) {
      return <CircularProgress />;
    }
    if (data) {
      return (
        <Box
          sx={{
            background: data.hexCode,
            borderRadius: 1.5,
            flex: 1,
          }}
        />
      );
    } else {
      return <FaBan className="h-6 w-6" />;
    }
  };

  return (
    <Stack>
      <Stack
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
          px: 4,
          py: 1,
        }}
      >
        <Box
          sx={{
            height: 30,
            width: 30,
            minHeight: 30,
            minWidth: 30,
            display: 'flex',
          }}
        >
          <Color />
        </Box>
        <Stack>
          <Typography variant="body2" color="text.secondary">
            EAN
          </Typography>
          <Typography variant="body1" color="text.primary">
            {model.eanCode}
          </Typography>
        </Stack>
        <Stack>
          <Typography variant="body2" color="text.secondary">
            Kod:
          </Typography>
          <Typography variant="body1" color="text.primary">
            {model.productCode}
          </Typography>
        </Stack>
      </Stack>
      <BikeTable model={model} placeId={placeId} />
    </Stack>
  );
}
