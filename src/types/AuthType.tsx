export type RegisterRequestType = {
    email: string,
    firstname: string,
    lastName: string,
    password: string,
    birthDate: string,
    region: number
}

export type LoginRequestType = {
    email: string,
    password: string
}

export type RefreshRequestType = {
    refreshToken: string
}