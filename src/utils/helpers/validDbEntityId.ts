import {VALID_UUID_REGEX} from "../constants";

export const isValidMongoUuid = (id: string): boolean =>
    VALID_UUID_REGEX.test(id);