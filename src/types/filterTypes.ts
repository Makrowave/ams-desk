import { SelectOption, SelectOptionWithColor } from './selectTypes';

export interface Orderable {
  order: number;
}

export type Color = SelectOptionWithColor & Orderable;

export type Manufacturer = SelectOption & Orderable;

export type Status = SelectOptionWithColor & Orderable;

export type Category = SelectOption & Orderable;

export type WheelSize = SelectOption & Orderable;

export type Place = SelectOption & Orderable;
