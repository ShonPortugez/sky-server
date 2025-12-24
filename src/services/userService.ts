import {User} from "../models";
import {UserData} from "../utils/types/user";

export class UserService {

    public async createUser(data: UserData): Promise<User> {
        throw new Error("Method not implemented.");
    }

    public async getUserById(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }

    public async getUserByEmail(email: string): Promise<User> {
        throw new Error("Method not implemented.");
    }

    public async updateUser(existingUser: User, data: UserData) {
        throw new Error("Method not implemented.");
    }

    public async deleteUser(user: User) {
        throw new Error("Method not implemented.");
    }
}