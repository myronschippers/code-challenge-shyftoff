import express, { type Request, type Response } from 'express';

import DB from './db_connect';

const app = express();

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/api/agents', (_req: Request, res: Response) => {
  try {
    DB.all('SELECT * FROM agent', [], (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(200).json({ agents: rows });
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: { message: 'Internal Server Error', info: error } });
  }
});

export default app;
