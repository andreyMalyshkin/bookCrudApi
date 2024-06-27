import express, {Request, request, Response} from 'express';
import 'dotenv/config';
import logger from './logger';
import booksRouter from './routes/books';
import usersRouter from './routes/users';
import mongoose from "mongoose";

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());

logger.info(`Config: ${JSON.stringify(process.env, null, 2)}`);

mongoose.connect(process.env.MONGO_URL as string)
    .then(() => logger.info('Connected to MongoDB'))
    .catch(err => logger.error(`Failed to connect to MongoDB: ${err.message}`));

app.use('/books', booksRouter);
app.use('/users', usersRouter);

app.get(`/status`, async ( req: Request, res: Response ) => {
    logger.info(`Incoming request`)
    res.status(200).send("It is ok")
})

app.listen(PORT, () => logger.info(`Running on port ${PORT}`));