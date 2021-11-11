import "reflect-metadata";
import { Container, Inject, Service } from "typedi";
import { HttpService } from "./services/HttpService";
import { Config } from "./configs/Config";
import { DbService } from "./services/DbService"
import * as dotenv from "dotenv";
import {UserListenerService} from "./services/UserListenerService";

@Service()
export class Application {
    @Inject()
    public config: Config;
    @Inject()
    private httpService: HttpService;
    @Inject()
    public dbService: DbService;
    @Inject()
    public userListener: UserListenerService;

    async start() {
        await this.httpService.start();
        await this.dbService.start();
        await this.userListener.start();
        return this;
    }
}

dotenv.config({ path: '.env' });
export const app = Container.get(Application);
app.start().catch(console.error);