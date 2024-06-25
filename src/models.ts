import { Schema, model } from 'mongoose';

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publicationDate: { type: Date, required: true },
  genres: { type: [String], required: true }
});

export const Book = model('Book', bookSchema);

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: Number, default: 1 }
});

export const User = model('User', userSchema);