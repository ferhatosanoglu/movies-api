import * as mongoose from 'mongoose';

export class UserModel {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export const UserSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: [true, 'Firstname is required'] },
        email: {
            type: String,
            required: [true, 'email is required'],
            unique: true,
        },
        lastName: { type: String, required: [true, 'Last Name is required'] },
        password: { type: String, required: true },
    },
    { versionKey: false, timestamps: true },
);
