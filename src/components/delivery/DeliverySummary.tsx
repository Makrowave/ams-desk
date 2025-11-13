'use client';
import {
  Box,
  Button,
  Card,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { FaPencil } from 'react-icons/fa6';
import { Delivery } from '../../types/deliveryTypes';
import EditDeliveryModal from './modals/EditDeliveryModal';
import DateDisplay from '../DateDisplay';

const DeliverySummary = ({ delivery }: { delivery: Delivery }) => {
  return (
    <Card
      sx={{
        height: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Typography variant="h6">Szczegóły</Typography>
        <EditDeliveryModal delivery={delivery} />
      </Box>
      <List sx={{ width: '100%' }}>
        <ListItem>
          <ListItemText
            primary="Miejsce dostawy"
            secondary={delivery.place?.name}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Planowana data"
            secondary={
              <DateDisplay
                typographyProps={{ variant: 'body2' }}
                date={delivery.plannedArrivalDate}
              />
            }
          />
        </ListItem>
        {delivery.startDate && (
          <ListItem>
            <ListItemText
              primary="Data rozpoczęcia"
              secondary={delivery.startDate}
            />
          </ListItem>
        )}
        {delivery.finishDate && (
          <ListItem>
            <ListItemText
              primary="Data zakończenia"
              secondary={delivery.finishDate}
            />
          </ListItem>
        )}
      </List>
    </Card>
  );
};

export default DeliverySummary;
