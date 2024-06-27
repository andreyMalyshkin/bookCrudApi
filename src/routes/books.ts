import { Router, Request, Response } from 'express';
import logger from '../logger';
import { Book } from '../models/bookSchema';
import { authenticate, authorize } from '../auth';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  logger.info(`Incoming request for GET /books`)
  const books = await Book.find();
  res.json(books);
});

router.get('/:id', async (req: Request, res: Response) => {
  logger.info(`Incoming request for some book with id:${req.params.id}`)
  const book = await Book.findById(req.params.id);
  if (book) {
    res.json(book);
  } else {
    logger.error("Book not found")
    res.status(404).send('Book not found');
  }
});

router.post('/', authenticate, authorize('Admin'), async (req: Request, res: Response) => {
  const newBook = new Book(req.body);
  await newBook.save();
  logger.info(`Added new book: ${JSON.stringify(newBook)}`);
  res.status(201).json(newBook);
});

router.put('/:id', authenticate, authorize('Admin'), async (req: Request, res: Response) => {
  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (updatedBook) {
    logger.info(`Updated book with id ${req.params.id}: ${JSON.stringify(updatedBook)}`);
    res.json(updatedBook);
  } else {
    logger.error(`Book not found`)
    res.status(404).send('Book not found');
  }
});

router.delete('/:id', authenticate, authorize('Admin'), async (req: Request, res: Response) => {
  const deletedBook = await Book.findByIdAndDelete(req.params.id);
  if (deletedBook) {
    logger.info(`Deleted book with id ${req.params.id}`);
    res.status(204).send();
  } else {
    logger.error(`Book not found id: ${req.params.id}`)
    res.status(404).send('Book not found');
  }
});

export default router;
