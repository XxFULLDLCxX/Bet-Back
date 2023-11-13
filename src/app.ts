import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares';
import { betsRouter, gamesRouter, participantsRouter } from '@/routers';

const app = express();
app.use(cors());
app.use(express.json());
app.get('/healthz', (_req, res) => {
  res.send('OK!');
});
app.use('/participants', participantsRouter);
app.use('/games', gamesRouter);
app.use('/bets', betsRouter);
app.use(errorHandler);

export default app;
