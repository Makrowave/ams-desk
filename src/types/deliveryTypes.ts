import { Category, Color, Manufacturer, Place, WheelSize } from './filterTypes';

export enum DeliveryStatus {
  Pending = 0,
  Started = 1,
  Finished = 2,
  Cancelled = 3,
}

export type DeliveryModel = {
  Id: number;
  ProductCode?: string | null;
  EanCode?: string | null;
  Name?: string | null;
  FrameSize?: number | null;
  IsWoman?: boolean | null;
  WheelSizeId?: number | null;
  ManufacturerId?: number | null;
  ColorId?: number | null;
  CategoryId?: number | null;
  PrimaryColor?: string | null;
  SecondaryColor?: string | null;
  Price?: number | null;
  IsElectric?: boolean | null;
  Link?: string | null;
  InsertionDate: Date;
  Manufacturer?: Manufacturer | null;
  Color?: Color | null;
  Category?: Category | null;
  WheelSize?: WheelSize | null;
};

export type DeliveryItem = {
  Id: number;
  DeliveryDocumentId: number;
  ModelId?: number | null;
  TemporaryModelId?: number | null;
  Count: number;
  StorageCount: number;
  DeliveryModel?: DeliveryModel | null;
};

export type DeliveryDocument = {
  Id: number;
  Date: Date;
  Name: string;
  Items?: DeliveryItem[] | null;
};

export type Invoice = {
  Id: number;
  InvoiceNumber: string;
  IssueDate: Date;
  PaymentDate: Date;
  IssuerName: string;
  IssuerAddress: string;
  NettoAmount: number;
  BruttoAmount: number;
  DeliveryId: number;
};

export type Delivery = {
  Id: number;
  PlannedArrivalDate: Date;
  StartDate?: Date | null;
  FinishDate?: Date | null;
  InvoiceId: number;
  PlaceId: number;
  Status: DeliveryStatus;
  Place?: Place | null;
  Invoice?: Invoice | null;
  DeliveryDocuments: DeliveryDocument[];
};

export type NewDelivery = {
  PlaceId: number;
  InvoiceId: number;
  PlannedArrivalDate: Date;
};

export type DeliverySummary = {
  Id: number;
  PlannedArrival: Date;
  StartDate?: Date | null;
  FinishDate?: Date | null;
  Invoice: string;
  StatusId: number;
  Place: string;
};
