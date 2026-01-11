export type UserData =  { email: string, username: string, password: string };

export type UserAuthRequest = { email: string, password: string };

export type UserAuthResponse = { accessToken: string, refreshToken: string};