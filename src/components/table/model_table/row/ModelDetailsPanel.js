import React from 'react';
import { BikeTable } from './BikeTable';
import { useColorsQuery } from '@/hooks/queryHooks';
import { FaBan } from 'react-icons/fa6';
import { Box, Stack, Typography } from '@mui/material';

export function ModelDetailsPanel({ model, placeId }) {
  const color = useColorsQuery({ id: model.colorId.toString() });

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
        {color.data === undefined ? (
          <FaBan className="h-6 w-6" />
        ) : (
          <Box
            sx={{
              background: color.data.hexCode,
              height: 30,
              width: 30,
              minHeight: 6,
              minWidth: 6,
              borderRadius: 1.5,
            }}
          />
        )}
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
