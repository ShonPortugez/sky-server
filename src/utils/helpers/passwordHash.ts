import bcrypt from "bcrypt";
import {PASSWORD_SALT_ROUNDS} from "../constants";

export const hashPassword = async (passwordToHash: string)=> {
    return await bcrypt.hash(passwordToHash, PASSWORD_SALT_ROUNDS);
}

export const compareHashedPasswords = async (hashedPassword: string, toCompareWith: string) => {
    return await bcrypt.compare(toCompareWith, hashedPassword);
}
