import { Breakpoint } from '@mui/material';
import { DeliveryItem, DeliveryStatus } from '../types/deliveryTypes';

export const getDeliveryStatusColor = (
  status: DeliveryStatus,
):
  | 'deliveryStatus.pending'
  | 'deliveryStatus.inProgress'
  | 'deliveryStatus.completed'
  | 'deliveryStatus.cancelled' => {
  switch (status) {
    case DeliveryStatus.Pending:
      return 'deliveryStatus.pending';
    case DeliveryStatus.InProgress:
      return 'deliveryStatus.inProgress';
    case DeliveryStatus.Completed:
      return 'deliveryStatus.completed';
    case DeliveryStatus.Cancelled:
      return 'deliveryStatus.cancelled';
  }
};

export const getDeliveryStatusText = (status: DeliveryStatus): string => {
  switch (status) {
    case DeliveryStatus.Pending:
      return 'Oczekująca';
    case DeliveryStatus.InProgress:
      return 'W trakcie';
    case DeliveryStatus.Completed:
      return 'Zakończona';
    case DeliveryStatus.Cancelled:
      return 'Anulowana';
  }
};

export const getColorForInStorageFeedback = (
  item: DeliveryItem,
): 'success' | 'warning' | 'error' | 'text' => {
  if (item.count < 0) {
    return 'error';
  } else if (item.storageCount > item.count) {
    return 'warning';
  } else if (item.storageCount === item.count) {
    return 'success';
  } else {
    return 'text';
  }
};
