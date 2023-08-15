import * as mongoose from 'mongoose';
export class MoviesModel {
    name: string;
    imageUrl: string;
    director: string;
    creatorId: string;
    year: number;

}

export const MoviesSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, 'name is required'] },
        director: { type: String },
        imageUrl: { type: String, required: false },
        creatorId: { type: String, required: true },
        year: { type: Number, required: false },
    },
    { versionKey: false, timestamps: true },
);
