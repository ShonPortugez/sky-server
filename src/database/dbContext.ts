import mongoose, { Connection, Model } from "mongoose";
import {UserModel} from "../models";
import {SurveyModel} from "../models";
import {DB_TIMEOUT_MS} from "../utils/constants";
import {
    CheckboxQuestion,
    DateQuestion,
    MultiAnswerQuestion, Question,
    RateQuestion, SliderQuestion,
    TextQuestion
} from "../models/question.model";

class DbContext {
    private connection: Connection | null = null;

    // Collections
    public readonly users = UserModel;
    public readonly surveys = SurveyModel;

    // Questions references
    public readonly questions = {
        base: Question,
        slider: SliderQuestion,
        rate: RateQuestion,
        text: TextQuestion,
        multi: MultiAnswerQuestion,
        date: DateQuestion,
        checkbox: CheckboxQuestion
    };

    public async init(uri: string) : Promise<void> {
        try{
            if(this.connection) return;

            const dbConnection = await mongoose.connect(uri, {
                autoIndex: true,
                serverSelectionTimeoutMS: DB_TIMEOUT_MS,
            });

            this.connection = dbConnection.connection
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export const db = new DbContext();