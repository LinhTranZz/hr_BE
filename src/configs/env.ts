import dotenv from "dotenv";

dotenv.config();

class EnvConfig {
    private static instance: EnvConfig;
    private readonly env: NodeJS.ProcessEnv;

    private constructor() {
        dotenv.config();
        this.env = process.env;

        // Validate required environment variables
        const requiredEnv = [
            "DB_USER",
            "DB_PASSWORD",
            "DB_SERVER",
            "DB_NAME",
            "PORT",
            "NODE_ENV",
            "JWT_SECRET",
            "JWT_EXPIRY",
            "EMAIL_HOST",
            "EMAIL_PORT",
            "EMAIL_USER",
            "EMAIL_PASS",
        ] as const;
        for (const key of requiredEnv) {
            if (!this.env[key]) {
                throw new Error(`Environment variable ${key} is required but not set.`);
            }
        }
    }

    public static getInstance(): EnvConfig {
        if (!EnvConfig.instance) {
            EnvConfig.instance = new EnvConfig();
        }
        return EnvConfig.instance;
    }

    public get<T>(key: string): string {
        return this.env[key] as string;
    }

    // JWT specific getters
    public getJwtSecret(): string {
        return this.get("JWT_SECRET");
    }

    public getJwtExpiry(): string {
        return this.get("JWT_EXPIRY");
    }
}

export default EnvConfig.getInstance();
