import {injectable} from "tsyringe";
import {User} from "../models";

@injectable()
export class UserMapper {

    public mapToDto(user: User) {
        return {
            username: user.username,
            email: user.email,
            timestamp: Date.now(),
        }
    }
}