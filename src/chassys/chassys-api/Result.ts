export type Ok<T> = {
  __t: 'OK';
  value: T;
  statusCode?: number;
};
export type ErrorType = {
  message: string;
  code?: string;
  field?: string;
};
export type Err<E = ErrorType> = {
  __t: 'ERR';
  value: never;
  errors: E[];
  statusCode: number;
};
export type Result<T, E = ErrorType> = Ok<T> | Err<E>;
export const isError = <T, E = ErrorType>(v: Result<T, E>): v is Err<E> => {
  return v.__t === 'ERR';
};

export class ResultFactory {
  static ok<T>(value: T, statusCode: number = 200): Ok<T> {
    return {
      __t: 'OK',
      value,
      statusCode,
    };
  }

  static err<E = ErrorType>(errors: E[], statusCode: number = 400): Err<E> {
    return {
      __t: 'ERR',
      value: undefined as never,
      errors,
      statusCode,
    };
  }

  static notFound(message: string = 'Resource not found'): Err {
    return this.err([{ message, code: 'NOT_FOUND' } as ErrorType], 404);
  }

  static badRequest(errors: ErrorType[]): Err {
    return this.err(errors, 400);
  }

  static unauthorized(message: string = 'Unauthorized'): Err {
    return this.err([{ message, code: 'UNAUTHORIZED' } as ErrorType], 401);
  }

  static forbidden(message: string = 'Forbidden'): Err {
    return this.err([{ message, code: 'FORBIDDEN' } as ErrorType], 403);
  }

  static serverError(message: string = 'Internal server error'): Err {
    return this.err([{ message, code: 'SERVER_ERROR' } as ErrorType], 500);
  }
}

export const ok = ResultFactory.ok;
export const err = ResultFactory.err;
export const notFound = ResultFactory.notFound.bind(ResultFactory);
export const badRequest = ResultFactory.badRequest.bind(ResultFactory);
export const unauthorized = ResultFactory.unauthorized.bind(ResultFactory);
export const forbidden = ResultFactory.forbidden.bind(ResultFactory);
export const serverError = ResultFactory.serverError.bind(ResultFactory);
