import {BaseQuestion} from "./question.types";
import {BaseDocument} from "../utils/abstractions/mongoBaseDocument";
import {Types} from "mongoose";

export interface Survey extends BaseDocument{
    userId: Types.ObjectId;
    title: string;
    description: string;
    isActive: boolean;
    questions: BaseQuestion[];
}