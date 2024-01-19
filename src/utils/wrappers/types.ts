import { Request } from "express";
export interface RequestX extends Request {
  parameters?: any;
}

export interface ResponseX {
  version: string;
  status: string;
  code: number;
  message: string | null;
  data: any;
  options?: any;
  error?: any;
}