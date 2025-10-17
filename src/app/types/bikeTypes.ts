export type BikeRecord = {
  id: number;
  place: number;
  statusId: number;
  assembledBy?: number;
};

export type PlaceBikeCount = {
  placeId: number;
  count: number;
  isAvailable: boolean;
};

export type ModelRecord = {
  modelId: number;
  productCode?: string;
  eanCode?: string;
  modelName: string;
  frameSize: number;
  wheelSize: number;
  manufacturerId: number;
  price: number;
  isWoman: boolean;
  isElectric: boolean;
  bikeCount: number;
  primaryColor?: string;
  secondaryColor?: string;
  categoryId: number;
  colorId?: number;
  link?: string;
  favorite: boolean;
  placeBikeCount: PlaceBikeCount[];
};

export type Model = {
  modelId: number;
  productCode?: string;
  eanCode?: string;
  modelName: string;
  frameSize: number;
  wheelSize: number;
  isWoman: boolean;
  manufacturerId: number;
  colorId: number;
  categoryId: number;
  primaryColor: string;
  secondaryColor: string;
  price: number;
  isElectric: boolean;
  link?: string;
};

export type FavoriteModel = {
  modelId: number;
  modelName: string;
  manufacturerName: string;
  frameSize: number;
  wheelSize: number;
  productCode?: string;
  primaryColor?: string;
  secondaryColor?: string;
  count: number;
};

export type Bike = {
  bikeId?: number;
  modelId?: number;
  placeId?: number;
  statusId?: number;
  insertionDate?: string;
  saleDate?: string;
  salePrice?: number;
  assembledBy?: number;
};
