import {BaseDocument} from "../database/mongoBaseDocument";

export interface User extends BaseDocument{
    email: string;
    username: string;
    password: string;
}

