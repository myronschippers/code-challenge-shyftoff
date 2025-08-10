import express, { type Request, type Response } from 'express';

import DB from '../db_connect';

const router: express.Router = express.Router();

/**
 * GET All Agents from the `agent` table
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
 * GET a single Agent from the `agent` table
 */
router.get('/:agentId', (req: Request, res: Response): void => {
  try {
    const query = 'SELECT * FROM agent WHERE id = ?';
    DB.all(query, [req.params.agentId], (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      if (rows.length === 0) {
        res.status(404).json({ error: 'Agent not found' });
        return;
      }
      res.status(200).json(rows[0]);
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: { message: 'Internal Server Error', info: error } });
  }
});

/**
 * POST route to add a new agent to the `agent` table
 */
router.post(
  '/',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const query = `INSERT INTO agent(first_name, last_name, email)
      VALUES(?, ?, ?)
      RETURNING id;`;

    try {
      const { first_name, last_name, email } = req.body;
      DB.run(
        query,
        [first_name, last_name, email],
        (err: Error, rows: { id: number }[]) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          res.status(200).json({ agent: rows });
        }
      );
    } catch (error) {
      res
        .status(500)
        .json({ error: { message: 'Internal Server Error', info: error } });
    }
  }
);

/**
 * POST route to add a new agent to the `agent` table
 */
router.put(
  '/:agentId',
  (req: Request, res: Response, next: express.NextFunction): void => {
    try {
      const query = `UPDATE agent
        SET first_name = ?, last_name = ?, email = ?, is_active = ?
        WHERE id = ?;`;
      const { agentId } = req.params;
      const { first_name, last_name, email, is_active } = req.body;

      // Validate required fields
      if (
        !first_name ||
        !last_name ||
        !email ||
        typeof is_active === 'boolean'
      ) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      DB.run(
        query,
        [first_name, last_name, email, is_active ? 1 : 0, agentId],
        (err: Error, rows: { id: number }[]) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          res.status(200).json({ agent: rows });
        }
      );
    } catch (error) {
      res
        .status(500)
        .json({ error: { message: 'Internal Server Error', info: error } });
    }
  }
);

export { router as agentRouter };
