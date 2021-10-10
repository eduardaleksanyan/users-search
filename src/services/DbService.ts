import "reflect-metadata";
import { Inject, Service } from "typedi";
import { Config }          from "../configs/Config";
import { createPool, Pool } from 'mysql2/promise';
import { app } from "../Application";

@Service()
export class DbService {
    public static connection: Pool;

    public async start(): Promise<void> {
        try {
            if (!DbService.connection) {
                await this.connect();
            }
        } catch (e) {
            console.warn("DB connection error:", e.message);
            await this.reconnect();
        }
    }

    async connect(): Promise<void> {
        DbService.connection = await createPool(app.config.dbConfig);
        console.info("Db Service started");
    }

    async reconnect() {
        await this.connect();
    }
}
