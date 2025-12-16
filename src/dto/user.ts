export interface UserDto {
    id: string;
    email: string;
    username: string;
    createdAt: Date;
}

export interface UserDataDto {
    username: string;
    email: string;
    password: string;
}