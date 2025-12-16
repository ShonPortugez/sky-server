import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser {
    id: string;
    email: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema({
    email: {
       type: String,
       required: true,
       trim: true,
       unique: true,
       minlength: 5,
       lowercase: true,
    },
    username: {
       type: String,
       required: true,
       trim: true,
       unique: true,
       minlength: 3,
       lowercase: true,
    },
    password: {
       type: String,
       required: true,
       trim: true,
       select: true,
    },
    createdAt: {
        type: Date,
    },
},
    {timestamps: true}
);

export const User = mongoose.model<IUser>('User', userSchema);

