import { config } from 'dotenv'; config();

const ENV_VARIABLES = process.env;

export const APP_PORT = ENV_VARIABLES.APP_PORT || 3000;
export const DATABASE_URI = ENV_VARIABLES.DATABASE_URI || '';
export const JWT_SECRET = ENV_VARIABLES.JWT_SECRET || '';