export type SelectOption = {
  id: number;
  name: string;
};

export type SelectOptionWithColor = SelectOption & {
  color: string;
};
