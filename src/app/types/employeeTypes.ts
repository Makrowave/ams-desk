import { SelectOption } from './selectTypes';

export type Employee = SelectOption;

export type LoginModel = {
  username: string;
  password: string;
};

export type User = {
  userId: number;
  username: string;
  password?: string;
  employeeId?: number;
};
