export enum APIStatus {IDLE, PENDING, REJECTED, FULFILLED}

export type APIError = {
    message: string;
    code: number;
}

export type APIData<D> = {
    status: APIStatus;
    error?:APIError;
    data?:D;
}
