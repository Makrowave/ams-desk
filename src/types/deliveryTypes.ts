import { Category, Color, Manufacturer, Place, WheelSize } from './filterTypes';

export enum DeliveryStatus {
  Pending = 0,
  InProgress = 1,
  Completed = 2,
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
  insertionDate: string;
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
  deliveryModel: DeliveryModel;
};

export type DeliveryDocument = {
  id: number;
  date: Date;
  name: string;
  deliveryId: number;
  items?: DeliveryItem[] | null;
};

export type Invoice = {
  id: number;
  invoiceNumber: string;
  issueDate: string;
  paymentDate: string;
  issuerName: string;
  issuerAddress: string;
  nettoAmount: number;
  bruttoAmount: number;
  deliveryId: number;
};

export type Delivery = {
  id: number;
  plannedArrivalDate: string;
  startDate?: string | null;
  finishDate?: string | null;
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
  plannedArrivalDate: string;
};

export type DeliverySummary = {
  id: number;
  plannedArrival: string;
  startDate?: string | null;
  finishDate?: string | null;
  invoice: string;
  statusId: number;
  place: string;
};
