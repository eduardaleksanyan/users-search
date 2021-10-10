import {UnauthorizedError}      from "routing-controllers";
import {KoaMiddlewareInterface} from "routing-controllers";
import {env, getBearerToken}    from "../helpers/helper";

export class ApiMiddleware implements KoaMiddlewareInterface {
    use(context: any, next: (err?: any) => Promise<any>): Promise<any> {
        const {request: {headers}} = context;
        let bearerToken = headers.authorization;
        if (bearerToken === 'undefined' || getBearerToken(bearerToken) !== env("API_KEY", "ThH0Ej9eGvl8Ns892URd5CUcabbYep0g4")) {
            throw new UnauthorizedError();
        }

        return next();
    }
}
