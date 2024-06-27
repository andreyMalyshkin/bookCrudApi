import { Schema, model } from 'mongoose';

const bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publicationDate: { type: Date, required: true },
    genres: { type: [String], required: true }
});

export const Book = model('Book', bookSchema);