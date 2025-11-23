import { Breakpoint } from '@mui/material';
import {
  Delivery,
  DeliveryItem,
  DeliveryModel,
  DeliveryStatus,
} from '../types/deliveryTypes';

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

/**
 *
 * @param delivery
 * @returns Array of ids of delivery items with invalid temporary models
 */

export const validateTemporaryModels = (delivery: Delivery) => {
  const itemsWithTempModels = delivery.deliveryDocuments
    .flatMap((doc) =>
      doc.deliveryItems?.filter((item) => item.temporaryModelId !== null),
    )
    .filter(Boolean) as DeliveryItem[];

  return itemsWithTempModels
    .filter((item) => !validateTemporaryModel(item.deliveryModel))
    .map((item) => item.id);
};

/**
 *
 * @param model
 * @returns Returns true if model is valid
 */
const validateTemporaryModel = (model: DeliveryModel) => {
  // Ordered by UI
  if (model.name === null) return false;
  if (model.eanCode === null) return false;
  if (model.productCode === null) return false;

  if (model.frameSize === null) return false;
  if (model.price === null) return false;
  if (model.wheelSizeId === null) return false;

  if (model.manufacturerId === null) return false;
  if (model.categoryId === null) return false;
  if (model.colorId === null) return false;

  if (model.primaryColor === null) return false;
  if (model.secondaryColor === null) return false;

  if (model.isWoman === null) return false;
  if (model.isElectric === null) return false;

  return true;
};
