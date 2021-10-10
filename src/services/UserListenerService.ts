import "reflect-metadata";
import {Container, Inject, Service} from "typedi";
import { Config }          from "../configs/Config";
import { createPool, Pool } from 'mysql2/promise';
import {CronJob, time} from 'cron';
import axios from "axios";
import {USER_LISTENER_API} from "../constants";
import {UserModel} from "../models/UserModel";
import {app, Application} from "../Application";
import {DbService} from "./DbService";

@Service()
export class UserListenerService {
    cronJob: CronJob;

    @Inject()
    private userModel: UserModel

    public async start(): Promise<void> {
        try {
            console.log('Cron start')
            this.cronJob = new CronJob('0 * * * * *', async () => {
                try {
                    await this.listener();
                } catch (e) {
                    console.error('Cron Job error:' + e);
                }
            });

            if (!this.cronJob.running) {
                this.cronJob.start();
            }
        } catch (e) {
            console.warn("UserModel Listener Service error:", e.message);
        }
    }

    async listener(): Promise<void> {
        try {
            console.log('listener start: ' + new Date().toUTCString())
            const responseUrl = await axios.get(USER_LISTENER_API + 'api/users', {
                timeout: 10000
            });

            let content = responseUrl.data.data;
            if (content) {
                await this.userModel.insertBulk(content)
            }
        } catch (e) {
            console.warn("UserModel Listener Service error:", e.message);
        }
    }
}