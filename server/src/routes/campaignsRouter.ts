import express, { type Request, type Response } from 'express';

import DB from '../db_connect';

const router: express.Router = express.Router();

/**
 * GET All Campaigns from the `campaign` table
 */
router.get(
  '/',
  (_req: Request, res: Response, _next: express.NextFunction): void => {
    try {
      DB.all('SELECT * FROM campaign;', (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }

        res.status(200).json({
          campaigns: rows,
        });
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: { message: 'Internal Server Error', info: error } });
    }
  }
);

export { router as campaignsRouter };
