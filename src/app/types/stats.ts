export type SoldBike = {
  id: number;
  model: string;
  manufacturer: string;
  primaryColor?: string;
  secondaryColor?: string;
  place: string;
  price: number;
  salePrice: number;
  discount: number;
  discountPercent: number;
  saleDate: string;
};
export type Series<T> = {
  label: string;
  data: T[];
};
export type PieChart = {
  id: number;
  name: string;
  quantity: number;
  value: number;
};

export type DateAndPrice = {
  date: string;
  price: number;
};
