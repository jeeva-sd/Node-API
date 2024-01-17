import dotenv from 'dotenv';
import { Environment } from 'config';

// Load environment variables from the corresponding .env file
const environment = process.env.NODE_ENV || 'local';
dotenv.config({ path: `.${environment}.env` });

// Parse the environment variables
const env: Environment = { ...process?.env || {} };

// Helper function to parse and return the value with fallback
const readEnv = (name: string, fallback: any) => {
    const value = env[name];
    if (typeof value === "undefined") return fallback;
    if (typeof fallback === "number") return parseInt(value) ? parseInt(value) : fallback;
    if (typeof fallback === "boolean") return value === "true" ? true : false;
    return value;
};

export { readEnv };