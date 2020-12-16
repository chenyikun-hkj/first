import { createPool, Pool } from "mysql2";
import EnvConfig from "../config/EnvConfig";

export default class DbConnection {

    public static readonly ins = new DbConnection();

    private pool: Pool;

    private constructor() {
        this.pool = createPool(EnvConfig.get().getDbInfo());
    }

    public close() {
        this.pool.end();
    }

    public async query<T>(sql: string, params?: any | any[] | { [param: string]: any }): Promise<T[]> {
        const connection = await this.pool.promise().getConnection();
        const [rows] = await connection.query(sql, params);
        return rows as T[];
    }
}