import "reflect-metadata";
import { Service } from "typedi";
import { createServer } from "http";
import Koa from "koa";
import { createKoaServer } from "routing-controllers";
import { app as appMain } from "../Application";

@Service()
export class HttpService {
    private app: Koa;

    public async start() {
        this.app = createKoaServer(appMain.config.httpConfig);
        const srv = createServer(this.app.callback());

        const port = Number(appMain.config.appConfig.port) || 3000;
        return new Promise<void>((resolve) => {
            srv.listen(port, process.env.HOST || "0.0.0.0", () => {
                console.info(`Server started listening at ${port} port`);

                resolve();
            });
        });
    }
}
