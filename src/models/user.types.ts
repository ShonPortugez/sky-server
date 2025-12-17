import {BaseDocument} from "../utils/abstractions/mongoBaseDocument";

export interface User extends BaseDocument{
    email: string;
    username: string;
    password: string;
}

