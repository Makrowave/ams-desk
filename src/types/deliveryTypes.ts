import { Category, Color, Manufacturer, Place, WheelSize } from './filterTypes';

export enum DeliveryStatus {
  Pending = 0,
  Started = 1,
  Finished = 2,
  Cancelled = 3,
}

export type DeliveryModel = {
  id: number;
  productCode?: string | null;
  eanCode?: string | null;
  name?: string | null;
  frameSize?: number | null;
  isWoman?: boolean | null;
  wheelSizeId?: number | null;
  manufacturerId?: number | null;
  colorId?: number | null;
  categoryId?: number | null;
  primaryColor?: string | null;
  secondaryColor?: string | null;
  price?: number | null;
  isElectric?: boolean | null;
  link?: string | null;
  insertionDate: Date;
  manufacturer?: Manufacturer | null;
  color?: Color | null;
  category?: Category | null;
  wheelSize?: WheelSize | null;
};

export type DeliveryItem = {
  id: number;
  deliveryDocumentId: number;
  modelId?: number | null;
  temporaryModelId?: number | null;
  count: number;
  storageCount: number;
  deliveryModel?: DeliveryModel | null;
};

export type DeliveryDocument = {
  id: number;
  date: Date;
  name: string;
  items?: DeliveryItem[] | null;
};

export type Invoice = {
  id: number;
  invoiceNumber: string;
  issueDate: Date;
  paymentDate: Date;
  issuerName: string;
  issuerAddress: string;
  nettoAmount: number;
  bruttoAmount: number;
  deliveryId: number;
};

export type Delivery = {
  id: number;
  plannedArrivalDate: Date;
  startDate?: Date | null;
  finishDate?: Date | null;
  invoiceId: number;
  placeId: number;
  status: DeliveryStatus;
  place?: Place | null;
  invoice?: Invoice | null;
  deliveryDocuments: DeliveryDocument[];
};

export type NewDelivery = {
  placeId: number;
  invoiceId: number;
  plannedArrivalDate: Date;
};

export type DeliverySummary = {
  id: number;
  plannedArrival: Date;
  startDate?: Date | null;
  finishDate?: Date | null;
  invoice: string;
  statusId: number;
  place: string;
};
