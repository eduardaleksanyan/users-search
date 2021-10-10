export interface ObjectLiteral {
    [key: string]: string;
}

export interface ConfigLiteral {
    [key: string]: any;
}

export interface IAppConfig {
    env: string;
    port: number;
    isLocal: boolean;
}

export interface IUser {
    first_name: string;
    last_name: string;
    email: string;
}

