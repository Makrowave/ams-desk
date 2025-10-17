export type Employee = {
  employeeId: number;
  employeeName: string;
};

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
