export enum APIStatus {IDLE, PENDING, REJECTED, FULFILLED}

export type APIError = {
    errors: string[];
    code: number;
}

export type APIData<D> = {
    status: APIStatus;
    error?:APIError;
    data?:D;
}
