import { ExtendedConfig } from "./types";

export const fallbackEnvs: ExtendedConfig = {
    VERSION: 'v1',
    APP_NAME: 'Express-E',
    PORT: 4000,
    NODE_ENV: 'local',

    JWT_ACCESS_SECRET_KEY: 'q[d43stzE~Fm+!*<',
    JWT_REFRESH_SECRET_KEY: 's5v8y/B?E(H+MbQe',
    JWT_ID_SECRET_KEY: 'replybotidtokensecret',
    JWT_ACCESS_EXPIRATION_DAYS: 7,
    JWT_REFRESH_EXPIRATION_DAYS: 30,
    JWT_ID_EXPIRATION_DAYS: 30,

    CRYPTO_ALGORITHM: 'aes-256-ctr',
    CRYPTO_SECRET: 'replybotportalencryptedsecret',
    CRYPTO_EXPIRATION_DAYS: 2,

    DB_HOST: '127.0.0.1',
    DB_PORT: 3306,
    DB_USERNAME: 'qwert3v$@hzSD',
    DB_NAME: 'apply',
    DB_PASSWORD: 'Qwerty',
    DB_CONNECTION_LIMIT: 20,
    DB_IS_MULTIPLE_STATEMENT: true,
    DB_SHOULD_WAIT_FOR_CONNECTIONS: false,

    ALLOWED_DOMAINS: 'http://localhost:3000'
};