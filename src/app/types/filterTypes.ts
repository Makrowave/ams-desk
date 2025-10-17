export type Color = HasHexCode & {
  colorId: number;
  colorName: string;
};

export type Manufacturer = {
  manufacturerId: number;
  manufacturerName: string;
};

export type Status = HasHexCode & {
  statusId: number;
  statusName: string;
};

export type Category = {
  categoryId: number;
  categoryName: string;
};

export interface HasHexCode {
  hexCode: string;
}

export type WheelSize = {
  key: number;
  value: number;
};
