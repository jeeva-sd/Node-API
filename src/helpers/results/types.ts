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

export enum MessageStatus {
  success = 'success',
  failure = 'failure',
  error = 'error',
}

export interface Message {
  message: string;
  status: string;
  httpStatus?: number;
}

export interface Messages {
  [key: number]: Message;
}

export interface RequestX extends Request {
  parameters?: Record<string, any>;
}

export type DbResult = DbResponse | any;