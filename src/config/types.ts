export interface Environment {
  [key: string]: string | undefined;
}

export interface AppInfo {
  version: string;
  name: string;
  port: number;
  environment: string;
}

export interface JwtConfig {
  accessSecretKey: string;
  refreshSecretKey: string;
  idSecretKey: string;
  accessExpirationDays: number;
  refreshExpirationDays: number;
  idExpirationDays: number;
}

export interface CryptoConfig {
  algorithm: string;
  secret: string;
  expirationDays: number;
}

export interface DbConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  dbName: string;
  connectionLimit: number;
  isMultipleStatement: boolean;
  shouldWaitForConnections: boolean;
  databaseURL: string;
}

export interface GeneralConfig {
  allowedDomains: string;
}
export interface AppConfig {
  app: AppInfo;
  jwt: JwtConfig;
  crypto: CryptoConfig;
  dbConnections: DbConfig;
  general: GeneralConfig;
}