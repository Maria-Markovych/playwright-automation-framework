import dotenv from 'dotenv';

dotenv.config();

function getEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Environment variable ${name} is not defined`);
    }
    return value;
}

export const environment = {
    baseUrl: getEnv("BASE_URL"),
    userName: getEnv("USER_NAME"),
    userPassword: getEnv("USER_PASSWORD"),
    userEmail: getEnv("USER_EMAIL"),
    env: getEnv("NODE_ENV"),
    headless: getEnv("HEADLESS") === "true",
    workers:getEnv("WORKERS"),
    apiUrl: getEnv("API_URL")
}