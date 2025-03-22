export type Ok<T> = {
  __t: 'OK';
  value: T;
};
export type Err = {
  __t: 'ERR';
  value: never;
  errors: string[];
};
export const isError = <T>(v: Ok<T> | Err): v is Err => {
  return v.__t === 'ERR';
};
