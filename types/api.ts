export interface IApiResponse<T> {
  status: boolean;
  path: string;
  statusCode: number;
  message: string;
  data: T;
  /** Raw exception / validation details (errors only). */
  error?: unknown;
}
