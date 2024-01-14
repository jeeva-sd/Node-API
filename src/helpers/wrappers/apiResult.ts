import { appConfig } from 'config';
import { ApiResult } from './types';
import { apiMessages, MessageStatus } from '~/constants';

// Common function to build an ApiResult
const buildApiResult = (code: number, data?: any, options?: any): ApiResult => {
  const message = options?.message ?? apiMessages[code]?.message ?? null;
  const status = apiMessages[code]?.status ?? MessageStatus.success;
  const error = options?.error ? extractErrorMessage(options?.error) : null;

  return {
    version: appConfig.app.version,
    code,
    status,
    message,
    data: data || null,
    error
  };
};

// specific code
export const take = (code: number, data?: any, options?: any): ApiResult => {
  return buildApiResult(code, data, options);
};

// successful operation
export const success = (data?: any): ApiResult => {
  return buildApiResult(1000, data);
};

// exception
// export const exception = (error: string | any, data?: any): ApiResult => {
//   const message = typeof error === "string" ? error : (error.message ?? error);
//   return buildApiResult(1004, data, { message });
// };

// unauthorized request
export const unauthorized = (error?: any): ApiResult => {
  return buildApiResult(401, null, { error });
};

// forbidden request
export const forbidden = (error?: any): ApiResult => {
  return buildApiResult(403, null, { error });
};

// client error
export const clientError = (error?: any): ApiResult => {
  return buildApiResult(400, null, { error });
};

// server error
export const serverError = (error?: any): ApiResult => {
  return buildApiResult(500, null, { error });
};

// not found
export const notFound = (error?: any): ApiResult => {
  return buildApiResult(404, null, { error });
};

// Helper functions for common responses
export const dataFound = (data: any): ApiResult => {
  return buildApiResult(1000, data);
};

export const dbError = (data: any): ApiResult => {
  return buildApiResult(1004, null, { error: data.error });
};

export const dataNotFound = (data: any = []): ApiResult => {
  return buildApiResult(1001, data);
};

export const dataList = (data: any): ApiResult => {
  return data && data.length > 0 ? dataFound(data) : dataNotFound();
};

export function extractErrorMessage(error: any): string | null {
  if (typeof error === 'string') return error;
  else if (error instanceof Error) return error.message;
  else if (typeof error === 'object') {
    const errorMessage = error.message || (error.error && error.error.message);

    if (errorMessage) return errorMessage;
    return error.toString?.();
  }
  else return error?.toString?.() || null;
}
