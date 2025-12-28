import {User, UserModel} from "../models";
import {UserData} from "../types/user";
import {injectable} from "tsyringe";
import {BadRequestError} from "routing-controllers";
import bcrypt from "bcrypt";
import {PASSWORD_SALT_ROUNDS} from "../constants";

@injectable()
export class UserService {

    public async createUser(data: UserData): Promise<User> {
        const existingUser = await this.getUserByEmail(data.email);
        if (existingUser)
            throw new BadRequestError('Invalid email');

        return await UserModel.create(
            {
                username: data.username,
                email: data.email,
                password: await bcrypt.hash(data.password, PASSWORD_SALT_ROUNDS),
            }
        );
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
}