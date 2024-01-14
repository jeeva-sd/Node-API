import { Request } from "express";
import { DbResponse } from "../decorators";

export interface ApiResult {
  version: string;
  status: string;
  code: number;
  message: string | null;
  data: any;
  options?: any;
  error?: any;
}

export interface RequestX extends Request {
  parameters?: Record<string, any>;
}

export type DbResult = DbResponse | any;