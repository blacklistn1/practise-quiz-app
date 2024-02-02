export class BaseResponse<T> {
  status_code: number;
  data: T;

  constructor(data: Partial<BaseResponse<T>>) {
    Object.assign(this, data);
  }
}
