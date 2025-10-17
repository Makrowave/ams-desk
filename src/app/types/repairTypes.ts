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

export type PartCategory = {
  id: number;
  name: string;
};

export type PartType = {
  id: number;
  name: string;
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

export type Unit = {
  id: number;
  name: string;
};

export type Part = {
  partId: number;
  partName: string;
  price: number;
  partTypeId: number;
  unitId: number;
  unit?: Unit;
  partType?: PartType;
};

export type RepairStatus = {
  repairStatusId: number;
  name: string;
  color: string;
};

export type Service = {
  serviceId?: number;
  serviceName: string;
  price: number;
  serviceCategoryId: number;
  serviceCategory?: ServiceCategory;
};

export type ServiceCategory = {
  id: number;
  name: string;
};

export type Repair = {
  repairId: number;
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
  partUsedId: number;
  partId: number;
  repairId: number;
  amount: number;
  price: number;
  part?: Part;
  repair?: Repair;
};

export type ServiceDone = {
  serviceDoneId: number;
  serviceId: number;
  repairId: number;
  price: number;
  service?: Service;
  repair?: Repair;
};
