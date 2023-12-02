import { appConfig } from "../../config";
import { MessageStatus, messages } from "./messages";
import { ApiResult } from "./types";

export const buildApiResult = (code: number, data?: any, options?: any): ApiResult => {
  let message: string | null;
  let status: string = MessageStatus.success;

  if (messages.hasOwnProperty(code)) {
    message = options?.message ? options.message : messages[code].message;
    status = messages[code].status;
  }

  return {
    version: appConfig.app.VERSION,
    code,
    status,
    message: message ? message : null,
    data: data ? data : null,
    options
  };
};

export const take = (code: number, data?: any, params?: any): ApiResult => {
  return buildApiResult(code, data, params);
};

export const exception = (error: string | any, data?: any): ApiResult => {
  const message = typeof error === "string" ? error : (error.message ? error.message : error);
  return buildApiResult(1004, data, { message });
};

export const dataFound = (data: any): ApiResult => {
  return buildApiResult(1000, data);
};

export const dataNotFound = (data: any = []): ApiResult => {
  return buildApiResult(1001, data);
};

export const dataList = (data: any): ApiResult => {
  return data && data.length > 0 ? dataFound(data) : dataNotFound();
};
