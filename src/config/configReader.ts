import dotenv from 'dotenv';
import { AppConfig, Environment, ExtendedConfig } from './types';
import { fallbackEnvs } from './fallbackEnvs';

const environment = process.env.NODE_ENV || 'local';
dotenv.config({ path: `.${environment}.env` });

export const env: Environment = (() => {
    let env = null;
    try {
        env = process.env as Environment;
    } catch (error) {
        env = {};
    }
    return env;
})();

const readEnv = <K extends keyof ExtendedConfig>(name: K): ExtendedConfig[K] => {
    const value = env[name];
    const fallback = fallbackEnvs[name] as ExtendedConfig[K];

    if (typeof value === 'undefined') return fallback;
    if (typeof fallback === 'number') return parseInt(value) ? parseInt(value) as ExtendedConfig[K] : fallback;
    if (typeof fallback === 'boolean') return value === 'true' ? true as ExtendedConfig[K] : false as ExtendedConfig[K];
    return value as ExtendedConfig[K];
};

export const appConfig: AppConfig = {
    app: {
        VERSION: readEnv('VERSION'),
        APP_NAME: readEnv('APP_NAME'),
        PORT: readEnv('PORT'),
        NODE_ENV: readEnv('NODE_ENV'),
    },
    jwt: {
        JWT_ACCESS_SECRET_KEY: readEnv('JWT_ACCESS_SECRET_KEY'),
        JWT_REFRESH_SECRET_KEY: readEnv('JWT_REFRESH_SECRET_KEY'),
        JWT_ID_SECRET_KEY: readEnv('JWT_ID_SECRET_KEY'),
        JWT_ACCESS_EXPIRATION_DAYS: readEnv('JWT_ACCESS_EXPIRATION_DAYS'),
        JWT_REFRESH_EXPIRATION_DAYS: readEnv('JWT_REFRESH_EXPIRATION_DAYS'),
        JWT_ID_EXPIRATION_DAYS: readEnv('JWT_ID_EXPIRATION_DAYS'),
    },
    crypto: {
        CRYPTO_ALGORITHM: readEnv('CRYPTO_ALGORITHM'),
        CRYPTO_SECRET: readEnv('CRYPTO_SECRET'),
        CRYPTO_EXPIRATION_DAYS: readEnv('CRYPTO_EXPIRATION_DAYS'),
    },
    dbConnections: {
        DB_HOST: readEnv('DB_HOST'),
        DB_PORT: readEnv('DB_PORT'),
        DB_USERNAME: readEnv('DB_USERNAME'),
        DB_PASSWORD: readEnv('DB_PASSWORD'),
        DB_NAME: readEnv('DB_NAME'),
        DB_CONNECTION_LIMIT: readEnv('DB_CONNECTION_LIMIT'),
        DB_IS_MULTIPLE_STATEMENT: readEnv('DB_IS_MULTIPLE_STATEMENT'),
        DB_SHOULD_WAIT_FOR_CONNECTIONS: readEnv('DB_SHOULD_WAIT_FOR_CONNECTIONS'),
        DATABASE_URL: readEnv('DATABASE_URL')
    },
    general: {
        ALLOWED_DOMAINS: readEnv('ALLOWED_DOMAINS')
    }
};