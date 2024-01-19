import { readEnv } from 'utils';
import { AppConfig } from './types';

export const appConfig: AppConfig = {
    app: {
        version: readEnv('VERSION', 'v1.0'),
        name: readEnv('APP_NAME', 'Node-API'),
        port: readEnv('PORT', 1314),
        environment: readEnv('NODE_ENV', 'local'),
    },
    jwt: {
        accessSecretKey: readEnv('JWT_ACCESS_SECRET_KEY', 'default-access-secret'),
        refreshSecretKey: readEnv('JWT_REFRESH_SECRET_KEY', 'default-refresh-secret'),
        idSecretKey: readEnv('JWT_ID_SECRET_KEY', 'default-id-secret'),
        accessExpirationDays: readEnv('JWT_ACCESS_EXPIRATION_DAYS', 7),
        refreshExpirationDays: readEnv('JWT_REFRESH_EXPIRATION_DAYS', 30),
        idExpirationDays: readEnv('JWT_ID_EXPIRATION_DAYS', 30),
    },
    crypto: {
        algorithm: readEnv('CRYPTO_ALGORITHM', 'aes-256-ctr'),
        secret: readEnv('CRYPTO_SECRET', 'default-crypto-secret'),
        expirationDays: readEnv('CRYPTO_EXPIRATION_DAYS', 2),
    },
    database: {
        host: readEnv('DB_HOST', 'localhost'),
        port: readEnv('DB_PORT', 3306),
        username: readEnv('DB_USERNAME', 'default-username'),
        password: readEnv('DB_PASSWORD', 'default-password'),
        dbName: readEnv('DB_NAME', 'default-db-name'),
        connectionLimit: readEnv('DB_CONNECTION_LIMIT', 20),
        isMultipleStatement: readEnv('DB_IS_MULTIPLE_STATEMENT', true),
        shouldWaitForConnections: readEnv('DB_SHOULD_WAIT_FOR_CONNECTIONS', false),
        url: readEnv('DATABASE_URL', 'mysql://root:QwertyuI@localhost:3306/demo'),
    },
    general: {
        allowedDomains: readEnv('ALLOWED_DOMAINS', 'http://localhost:5173'),
    },
    validation: {
        abortEarly: readEnv('ABORT_EARLY', false)
    }
};