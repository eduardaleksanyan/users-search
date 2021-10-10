import {IUser} from "../types";
import {DbService} from "../services/DbService";

export class UserModel {
    public async insertBulk(list:[IUser]): Promise<void> {
        for (let item of list) {
            await DbService.connection.query('INSERT IGNORE INTO users (first_name, last_name, email) VALUES (?, ?, ?)',
                [item.first_name, item.last_name, item.email]);
        }
    }

    public static async find(text: string): Promise<any> {
        return await DbService.connection.query('SELECT * FROM users where MATCH(first_name, last_name) AGAINST(? IN BOOLEAN MODE)',
            [text + '*']);
    }
}