import {isURL, isDefined}                                                    from "class-validator";
import {Body, Ctx, Get, JsonController, Post, QueryParam, QueryParams, Res, UseBefore} from "routing-controllers";
import {Container} from "typedi";
import {Pool} from "mysql2/promise";
import { Inject } from "typescript-ioc";
import {app} from "../Application";
import { Response } from 'express';
import {DbService} from "../services/DbService";
import {UserModel} from "../models/UserModel";

@JsonController("/search")
export class SearchController {
    @Get("/")
    public async getAll(@QueryParam('text') text: string, @Res() response: Response) {
        try {
            let list = [];

            if (text) {
                list = await UserModel.find(text);
                list = list[0]
            }

            return {
                success: true,
                data: list
            };
        } catch (e) {
            response.statusCode = 500;
            console.error(e.message);
            return {
                success: false
            };
        }
    }
}