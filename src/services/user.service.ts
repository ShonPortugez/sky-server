import {User, UserModel} from "../models";
import {UserData} from "../utils/types/user";
import {injectable} from "tsyringe";

@injectable()
export class UserService {

    public async createUser(data: UserData): Promise<User> {
        return await UserModel.create({...data,});
    }

    public async getUserById(id: string): Promise<User> {
        return await UserModel.findById(id).exec();
    }

    public async getUserByEmail(email: string): Promise<User> {
        return await UserModel.findOne({email: email}).select('+password').exec();
    }

    public async updateUser(existingUser: User, data: UserData) {
        return await UserModel.findByIdAndUpdate(
            existingUser.id,
            {
                email: existingUser.email,
                password: existingUser.password,
                username: existingUser.username,
            },
            {
                new: true,
                runValidators: true,
            }
        ).exec();
    }

    public async deleteUser(user: User) {
        await UserModel.findByIdAndDelete(user.id).exec();
    }
}