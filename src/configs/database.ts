import { injectable } from "inversify";
import sql from "mssql";
import EnvConfig from "./env";


@injectable()
class Database {
    private readonly pool: sql.ConnectionPool;

    constructor() {
        const dbConfig = {
            user: EnvConfig.get("DB_USER") || "",
            password: EnvConfig.get("DB_PASSWORD") || "",
            server: EnvConfig.get("DB_SERVER") || "",
            database: EnvConfig.get("DB_NAME") || "",
            options: {
                encrypt: true,
                trustServerCertificate: true,
            },
            dialect: "mssql",
        };

        if (!dbConfig.user || !dbConfig.password || !dbConfig.server || !dbConfig.database) {
            throw new Error("Missing required database configuration environment variables.");
        }

        this.pool = new sql.ConnectionPool(dbConfig);
    }

    public async connect(): Promise<void> {
        if (!this.pool.connected) {
            await this.pool.connect();
            console.log("Connected to SQL Server");
        }
    }

    public async close(): Promise<void> {
        if (this.pool.connected) {
            await this.pool.close();
            console.log("Disconnected from SQL Server");
        }
    }

    public getPool(): sql.ConnectionPool {
        return this.pool;
    }
}

export default Database;
