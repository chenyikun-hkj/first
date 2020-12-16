import "dotenv-defaults/config"

interface EnvConfigProperties {
    DB_HOST: string;
    DB_PORT: string;
    DB_DATABASE: string;
    DB_USER: string;
    DB_PASSWORD: string;
}

export default class EnvConfig {
    private static readonly instance = new EnvConfig();
    public static get() { return this.instance; }
    private constructor() { }

    public get<K extends keyof EnvConfigProperties>(key: K, defaultValue?: EnvConfigProperties[K]) {
        return key in process.env ? process.env[key] : defaultValue;
    }

    public getNumber<K extends keyof EnvConfigProperties>(key: K, defaultValue?: number): number {
        return parseInt(this.get(key) ?? `${defaultValue}`)
    }

    public getDbInfo() {
        return {
            host: this.get('DB_HOST') ?? '',
            port: this.getNumber('DB_PORT'),
            database: this.get('DB_DATABASE') ?? '',
            user: this.get('DB_USER') ?? '',
            password: this.get('DB_PASSWORD') ?? '',
        }
    }
}