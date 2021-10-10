import { join } from "path";
import { Service } from "typedi";
import { IAppConfig, ConfigLiteral } from "../types";
import { env, toBool, toInt } from "../helpers/helper";
import { ENVIRONMENTS } from "../constants";
import { RoutingControllersOptions } from "routing-controllers";

@Service({ global: true })
export class Config implements ConfigLiteral {
    private app: IAppConfig = {
        env: env("NODE_ENV", "local"),
        isLocal: process.env.NODE_ENV === ENVIRONMENTS.local,
        port: toInt(env("APP_PORT", "3000")),
    };

    private pingInterval: number = toInt(env("DB_PING_INTERVAL", "5000"));

    private database = {
        host: env("DB_HOST", "localhost"),
        port: toInt(env("DB_PORT", "3306")),
        user: env("DB_USERNAME", "root"),
        password: env("DB_PASSWORD", ""),
        database: env("DB_DATABASE_NAME", "test"),
    };

    private http: RoutingControllersOptions = {
        validation: true,
        classTransformer: true,
        controllers: [join(__dirname, "../controllers/*.js")],
        // cors            : toBool(env("KOA_CORS", "true"))
        cors: {
            origin: "*"
        }
    };

    public get dbConfig() {
        return this.database;
    }

    public get httpConfig(): RoutingControllersOptions {
        return this.http;
    }

    public get appConfig() {
        return this.app;
    }
}
