interface IAnybject {
  [prop:string]: any
}

interface IResult<T> {
  code: number,
  data: T,
}

export type {
  IAnybject,
  IResult,
}
