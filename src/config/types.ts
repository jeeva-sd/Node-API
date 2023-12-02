export interface Environment {
  [key: string]: string | undefined;
};

interface AppCredential {
  VERSION: string;
  APP_NAME: string;
  PORT: number;
  NODE_ENV: string;
}

interface DbConnectionConfig {
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_NAME: string;
  DB_PASSWORD: string;
  DB_CONNECTION_LIMIT: number;
  DB_IS_MULTIPLE_STATEMENT: boolean;
  DB_SHOULD_WAIT_FOR_CONNECTIONS: boolean;
}

interface CryptoCredential {
  CRYPTO_ALGORITHM: string;
  CRYPTO_SECRET: string;
  CRYPTO_EXPIRATION_DAYS: number;
}

interface JwtCredential {
  JWT_ACCESS_SECRET_KEY: string;
  JWT_REFRESH_SECRET_KEY: string;
  JWT_ID_SECRET_KEY: string;
  JWT_ACCESS_EXPIRATION_DAYS: number;
  JWT_REFRESH_EXPIRATION_DAYS: number;
  JWT_ID_EXPIRATION_DAYS: number;
}

export interface AppConfig {
  app: AppCredential;
  jwt: JwtCredential;
  crypto: CryptoCredential;
  dbConnections: DbConnectionConfig;
};

export interface ExtendedConfig
  extends AppCredential, DbConnectionConfig,
  CryptoCredential, JwtCredential { }