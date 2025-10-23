import { SelectOption } from './selectTypes';

export type NewRepair = {
  phoneNumber: string;
  issue: string;
  bikeName: string;
  placeId: number;
  takeInEmployeeId: number;
};

export type MergeParts = {
  id1: number;
  id2: number;
  part: Part;
};

export type PartCategory = SelectOption;

export type PartType = SelectOption & {
  partCategoryId: number;
  partCategory?: PartCategory;
};

export type ShortRepair = {
  id: number;
  phoneNumber: string;
  bikeName: string;
  status: RepairStatus;
  date: string;
  placeId: number;
  placeName: string;
};

export type Unit = SelectOption;

export type Part = {
  id: number;
  name: string;
  price: number;
  partTypeId: number;
  unitId: number;
  unit?: Unit;
  partType?: PartType;
};

export type RepairStatus = {
  id: number;
  name: string;
  color: string;
};

export type Service = {
  id?: number;
  name: string;
  price: number;
  serviceCategoryId: number;
  serviceCategory?: ServiceCategory;
};

export type ServiceCategory = {
  id: number;
  name: string;
};

export type Repair = {
  id: number;
  phoneNumber: string;
  bikeName: string;
  issue: string;
  arrivalDate: string;
  collectionDate?: string;
  takeInEmployeeId: number;
  takeInEmployeeName: string;
  repairEmployeeId?: number;
  collectionEmployeeId?: number;
  discount: number;
  additionalCosts: number;
  statusId: number;
  placeId: number;
  note?: string;
  status?: RepairStatus;
  repairEmployeeName?: string;
  collectionEmployeeName?: string;
  services: ServiceDone[];
  parts: PartUsed[];
};

export type PartUsed = {
  id: number;
  partId: number;
  repairId: number;
  amount: number;
  price: number;
  part?: Part;
  repair?: Repair;
};

export type ServiceDone = {
  id: number;
  serviceId: number;
  repairId: number;
  price: number;
  service?: Service;
  repair?: Repair;
};
