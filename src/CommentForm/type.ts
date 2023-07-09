interface IFormField {
  label: string;
  name: string;
  type: string;
  options: IOption[];
  disabled: boolean,
}

interface IOption {
  value: string;
  label: string;
}

export type {
  IFormField,
}
