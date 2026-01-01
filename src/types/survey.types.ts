
export type SurveyData = { title: string, description: string, isActive: boolean };

export type SurveyDto = {
    id: string;
    userId: string;
    title: string;
    description: string;
    isActive: boolean;
    createdAt: Date;
}