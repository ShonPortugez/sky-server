import {UserDataDto, UserDto} from "../dto/user";
import {ApplicationError} from "../utils/applicationError";
import {IUser, User} from "../models/user";

export class UsersService {

    // Create
    async create(data: UserDataDto) {
        const newUser = new User(data);
        return await newUser.save();
    }

    // Retrieve
    async findById(id: string): Promise<UserDto | null> {
        if (!this.isValidObjectId(id)){
            throw new ApplicationError('Invalid Id format', 400);
        }

        const user: UserDto = await User.findById(id).select('-password');
        return user? user : null;
    }

    // Update
    async update(user: IUser, data: UserDataDto) {
        return User.findByIdAndUpdate(
            user.id,
            data,
            {
                new: true,
                runValidators: true,
            }
        );
    }

    // Delete
    async delete(user: IUser) {
        return User.findByIdAndDelete(user.id);
    }

    private isValidObjectId(id: string): boolean {
        return /^[0-9a-fA-F]{24}$/.test(id);
    }
}