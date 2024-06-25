import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import logger from './logger';
import { User } from './models';
import { authenticate, authorize } from './auth';
import { sendEmailConfirmation } from './mailer';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword, email });
  await newUser.save();
  sendEmailConfirmation(email);
  logger.info(`Registered new user: ${JSON.stringify(newUser)}`);
  res.status(201).json(newUser);
});

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    logger.info(`User logged in: ${username}`);
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

router.get('/me', authenticate, async (req: Request, res: Response) => {
  const user = await User.findById((req as any).user.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

router.put('/:id/role', authenticate, authorize('Admin'), async (req: Request, res: Response) => {
  const { role } = req.body;
  const updatedUser = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
  if (updatedUser) {
    logger.info(`Updated role for user with id ${req.params.id}: ${role}`);
    res.json(updatedUser);
  } else {
    res.status(404).send('User not found');
  }
});

export default router;