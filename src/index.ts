import express from 'express';
import 'dotenv/config';
import logger from './logger';
import booksRouter from './books';
import usersRouter from './users';

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());

app.use('/books', booksRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => logger.info(`Running on port ${PORT}`));