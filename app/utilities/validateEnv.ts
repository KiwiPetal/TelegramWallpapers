import 'dotenv/config';

const requiredEnvVars = ["BOT_TOKEN"] as const;

const validateEnvVars = () => {
  for (const varName of requiredEnvVars) {
    if (!process.env[varName]) {
      throw new Error(`Environment variable ${varName} is missing.`);
    }
  }
};

validateEnvVars();

export const BOT_TOKEN = process.env.BOT_TOKEN!;
