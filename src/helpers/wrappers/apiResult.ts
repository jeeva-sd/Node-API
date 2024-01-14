import { appConfig } from 'config';
import { ResponseX } from './types';
import { apiMessages, MessageStatus } from '~/constants';
import { DbResponse, extractErrorMessage } from '..';

// Common function to build an ResponseX
const buildResponseX = (code: number, data?: any, options?: any): ResponseX => {
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
export const take = (code: number, data?: any, options?: any): ResponseX => {
  return buildResponseX(code, data, options);
};

// successful operation
export const success = (data?: any): ResponseX => {
  return buildResponseX(1000, data);
};

// exception
// export const exception = (error: string | any, data?: any): ResponseX => {
//   const message = typeof error === "string" ? error : (error.message ?? error);
//   return buildResponseX(1004, data, { message });
// };

// unauthorized request
export const unauthorized = (error?: any): ResponseX => {
  return buildResponseX(401, null, { error });
};

// forbidden request
export const forbidden = (error?: any): ResponseX => {
  return buildResponseX(403, null, { error });
};

// client error
export const clientError = (error?: any): ResponseX => {
  return buildResponseX(400, null, { error });
};

// server error
export const serverError = (error?: any): ResponseX => {
  return buildResponseX(500, null, { error });
};

// not found
export const notFound = (error?: any): ResponseX => {
  return buildResponseX(404, null, { error });
};

// Helper functions for common responses
export const dataFound = (data: any): ResponseX => {
  return buildResponseX(1000, data);
};

export const dbError = (response: DbResponse): ResponseX => {
  const code = response?.code || 1005;
  const error = response?.error || null;
  return buildResponseX(code, null, { error });
};

export const dataNotFound = (data: any = []): ResponseX => {
  return buildResponseX(1001, data);
};

export const dataList = (data: any): ResponseX => {
  return data && data.length > 0 ? dataFound(data) : dataNotFound();
};