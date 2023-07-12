interface IAnybject {
  [prop:string]: any
}

interface IResult<T> {
  code: number,
  data: T,
}

type IToastType = 'success' | 'error' | 'info' | 'warning' | 'loading'

export type {
  IAnybject,
  IResult,
  IToastType,
}
