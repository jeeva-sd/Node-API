export interface ApiResult {
  version: string;
  status: string;
  code: number;
  message: string | null;
  data: any;
  options: any;
}