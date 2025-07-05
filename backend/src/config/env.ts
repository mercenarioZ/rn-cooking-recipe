import "dotenv/config";

interface EnvConfig {
  PORT?: string | number;
  [key: string]: any;
}

export const ENV: EnvConfig = {
  PORT: process.env.PORT || 8080,
  DB_URL: process.env.DB_URL,
  NODE_ENV: process.env.NODE_ENV || "development",
};
