export interface Environment {
  [key: string]: string | undefined;
}

interface AppInfo {
  version: string;
  name: string;
  port: number;
  environment: string;
}

interface JwtConfig {
  accessSecretKey: string;
  refreshSecretKey: string;
  idSecretKey: string;
  accessExpirationDays: number;
  refreshExpirationDays: number;
  idExpirationDays: number;
}

interface CryptoConfig {
  algorithm: string;
  secret: string;
  expirationDays: number;
}

interface DbConfig {
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

interface GeneralConfig {
  allowedDomains: string;
}
export interface AppConfig {
  app: AppInfo;
  jwt: JwtConfig;
  crypto: CryptoConfig;
  dbConnections: DbConfig;
  general: GeneralConfig;
}