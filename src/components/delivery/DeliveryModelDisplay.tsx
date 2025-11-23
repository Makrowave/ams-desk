import { Box, Card, Divider, Grid, Typography } from '@mui/material';
import { DeliveryModel } from '../../types/deliveryTypes';
import React from 'react';
import ColorPreview from '../table/ColorPreview';

const Detail = ({
  primary,
  secondary,
}: {
  primary: string;
  secondary: string | React.ReactNode | undefined;
}) => (
  <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3, xl: 2 }}>
    <Card sx={{ p: 2, minHeight: '80px' }}>
      <Typography variant="body2">{primary}</Typography>
      {typeof secondary === 'string' ? (
        <Typography variant="body1">{secondary}</Typography>
      ) : (
        secondary
      )}
    </Card>
  </Grid>
);

type DeliveryModelDisplayProps = {
  model: DeliveryModel | null | undefined;
};

const DeliveryModelDisplay = ({ model }: DeliveryModelDisplayProps) => (
  <>
    <Detail primary="Nazwa" secondary={model?.name} />
    <Detail primary="Kod EAN" secondary={model?.eanCode} />
    <Detail primary="Kod produktu" secondary={model?.productCode} />
    <Detail
      primary="Typ ramy"
      secondary={model?.isWoman ? 'Damska' : 'Męska'}
    />
    <Detail
      primary="Elektryczny"
      secondary={model?.isElectric ? 'Tak' : 'Nie'}
    />
    <Detail
      primary="Kolory"
      secondary={
        <ColorPreview
          primaryColor={model?.primaryColor}
          secondaryColor={model?.secondaryColor}
          disableRightMargin
        />
      }
    />
    <Detail
      primary="Kolor"
      secondary={
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Box
            sx={{
              height: '20px',
              width: '20px',
              border: '1px solid lightgray',
              borderRadius: '4px',
              bgcolor: model?.color?.color,
            }}
          />
          <Typography>{model?.color?.name}</Typography>
        </Box>
      }
    />
    <Detail primary="Rozmiar koła" secondary={`${model?.wheelSizeId}"`} />
    <Detail primary="Rozmiar ramy" secondary={model?.frameSize?.toString()} />
    <Detail primary="Cena" secondary={model?.price?.toString()} />
    <Detail primary="Producent" secondary={model?.manufacturer?.name} />
    <Detail primary="Kategoria" secondary={model?.category?.name} />
  </>
);

export default DeliveryModelDisplay;
