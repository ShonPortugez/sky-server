import {inject, injectable} from "tsyringe";
import {Body, Delete, Get, JsonController, Patch, Post, UseBefore} from "routing-controllers";
import {UserService} from "../services/user.service";
import {toUserResponse, UserData} from "../types/user";
import {RegistrationMiddleware} from "../middleware/registration.middleware";
import {AuthMiddleware} from "../middleware/auth.middleware";
import {CurrentUser} from "../decorators/currentUser";
import {User} from "../models";

@injectable()
@JsonController('/users')
export class UserController {
    constructor(@inject(UserService) private userService: UserService) {}

    @Post('/')
    @UseBefore(RegistrationMiddleware)
    async createUser(@Body() userData: UserData) {
        return toUserResponse(
            await this.userService.createUser(userData)
        );
    }

    @Get('/')
    @UseBefore(AuthMiddleware)
    async getCurrentUser(@CurrentUser() currentUser: User) {
        return toUserResponse(currentUser);
    }

    @Patch('/')
    @UseBefore(AuthMiddleware)
    async updateUser(@CurrentUser() currentUser: User, @Body() userData: UserData) {
        return toUserResponse(
            await this.userService.updateUser(currentUser, userData)
        );
    }
}