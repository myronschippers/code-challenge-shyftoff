import express, { type Request, type Response } from 'express';

import DB from '../db_connect';

const router: express.Router = express.Router();

/**
 * GET route template
 */
router.get(
  '/',
  (_req: Request, res: Response, next: express.NextFunction): void => {
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
  }
);

/**
 * POST route template
 */
router.post(
  '/',
  (req: Request, res: Response, next: express.NextFunction): void => {
    // POST route code here
  }
);

export { router as agentRouter };
