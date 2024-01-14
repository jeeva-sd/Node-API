import { Request } from "express";
import { DbResponse } from "../decorators";

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

export type DbResult = DbResponse | any;