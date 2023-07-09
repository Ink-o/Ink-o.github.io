interface IFormField {
  label: string;
  name: string;
  type: string;
  options: IOption[];
  disabled: boolean,
  min: number,
  max: number,
}

interface IOption {
  value: string;
  label: string;
}

export type {
  IFormField,
}
