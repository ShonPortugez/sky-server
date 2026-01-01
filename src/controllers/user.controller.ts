import {inject, injectable} from "tsyringe";
import {Body, Delete, Get, JsonController, Patch, Post, UseBefore} from "routing-controllers";
import {UserService} from "../services/user/user.service";
import {UserData} from "../types/user.types";
import {AuthMiddleware} from "../middleware/auth.middleware";
import {CurrentUser} from "../decorators/user.decorator";
import {User} from "../models";
import {UserMapper} from "../mappers/user.mapper";

@injectable()
@JsonController('/users')
export class UserController {
    constructor(
        @inject(UserService) private userService: UserService,
        @inject(UserMapper) private userMapper: UserMapper) {}

    @Post('/')
    async createUser(@Body() userData: UserData) {
        return this.userMapper.mapToDto(
            await this.userService.createUser(userData)
        );
    }

    @Get('/')
    async getCurrentUser(@CurrentUser() currentUser: User) {
        return this.userMapper.mapToDto(currentUser);
    }

    @Patch('/')
    async updateUser(@CurrentUser() currentUser: User, @Body() userData: UserData) {
        return this.userMapper.mapToDto(
            await this.userService.updateUser(currentUser, userData)
        );
    }
}