export type loginModel = {username: string, password: string};

export type regisrationModel = {
    role?: string,
    userName: string,
    password: string,
    confirmPassword: string,
    email: string,
    clientURIForEmailConfirmation?: string
}
