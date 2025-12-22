import {User} from "../models";
import {UserDataDto} from "../dto/user";

export class UserService {

    public async createUser(data: UserDataDto): Promise<User> {
        throw new Error("Method not implemented.");
    }

    public async getUserById(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }

    public async getUserByEmail(email: string): Promise<User> {
        throw new Error("Method not implemented.");
    }

    public async updateUser(existingUser: User, data: UserDataDto) {
        throw new Error("Method not implemented.");
    }

    public async deleteUser(user: User) {
        throw new Error("Method not implemented.");
    }
}