export function env(name: string, defaultValue?: any): any {
    return process.env[name] || defaultValue;
}

export function toBool(value: string): boolean {
    return value === "true";
}

export function toInt(variable: string): number {
    return parseInt(variable, 10);
}

export function isEmpty(obj: any) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function isValidDate(d: any) {
    return d instanceof Date && !isNaN(d.getDate());
}

export function getHostnameFromUrl(url: any) {
    return url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
}

export function getBearerToken(token: string) {

    if (token !== undefined) {
        let tokenArray = token.split(" ");
        if (tokenArray[1] !== undefined) {
            return tokenArray[1];
        }
    }

    throw new Error("BearerToken not found");
}