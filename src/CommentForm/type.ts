interface IFormField {
  label: string;
  name: string;
  type: string;
  options: IOption[];
  disabled: boolean,
  min: number,
  max: number,
  timeShow: boolean,
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
