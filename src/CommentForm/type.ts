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

interface ISendMessageParams {
  question: string
}

export type {
  IFormField,
  ISendMessageParams,
}
