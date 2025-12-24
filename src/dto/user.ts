
export interface UserDataDto {
    email: string;
    username: string;
    password: string;
}

export interface UserDto {
    id: string;
    email: string;
    username: string;
}

export interface UserAuthRequestDto {
    email: string;
    password: string;
}

export class UserAuthResponseDto {
    id: string;
    email: string;
    accessToken: string;
}