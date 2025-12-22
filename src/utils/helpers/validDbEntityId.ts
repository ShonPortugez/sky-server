import {VALID_UUID_REGEX} from "../constants";

export function isValidObjectId(id: string): boolean {
    return VALID_UUID_REGEX.test(id);
}