import {User, UserModel} from "../models";
import {UserData} from "../types/user.types";
import {injectable} from "tsyringe";
import {BadRequestError} from "routing-controllers";
import bcrypt from "bcrypt";
import {PASSWORD_SALT_ROUNDS} from "../constants";

@injectable()
export class UserService {

    public async createUser(data: UserData): Promise<User> {
        const existingUser = await this.getUserByEmail(data.email);
        if (existingUser)
            throw new BadRequestError('Email already exists');

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

    private async isEmailUnique(existingEmail: string, newEmail: string): Promise<boolean> {
        if(existingEmail === newEmail)
            return true;

        return !(await this.getUserByEmail(newEmail));
    }

    public async getUserByEmail(email: string): Promise<User> {
        return await UserModel.findOne({email: email}).select('+password').exec();
    }

    public async updateUser(existingUser: User, data: UserData) {

        const user = UserModel.findById(existingUser.id);
        const isUnique = await this.isEmailUnique(existingUser.email, data.email);
        if(!isUnique)
            throw new BadRequestError('Email already exists');

        return await user.updateOne(
            {
                email: data.email,
                password: data.password,
                username: data.username,
            },
            {
                new: true,
                runValidators: true,
            }
        ).exec();
    }
}