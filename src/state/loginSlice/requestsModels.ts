export type loginModel = { username: string, password: string };

export type regisrationModel = {
    role?: string,
    userName: string,
    password: string,
    confirmPassword: string,
    email: string,
    clientURIForEmailConfirmation?: string
}

export type UserType = {
    userId: number,
    externalUserId: number,
    userName: string,
    role: string,
    registryDate: string,
    email: string
}
