import express, { type Request, type Response } from 'express';
import bodyParser from 'body-parser';

import { agentRouter } from './routes/agentRouter';

const app = express();

// Body parser middleware
// ----------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

// Routes
// ----------
const BASE_API_URL = '/api';
app.use(`${BASE_API_URL}/agents`, agentRouter);

export default app;
