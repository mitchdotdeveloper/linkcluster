type NonFunctionProperties<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
export type OmitClassMethods<T> = Pick<T, NonFunctionProperties<T>>;

declare global {
  namespace Express {
    export interface Request {
      params: Request | { [key: string]: any };
    }
  }
}
