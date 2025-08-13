import express, { type Request, type Response } from 'express';

import DB from '../db_connect';

const router: express.Router = express.Router();

type AgentDbQuery = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  is_active: number;
  created_at: string;
  campaigns: string;
};

/**
 * GET All Agents from the `agent` table
 */
router.get(
  '/',
  (req: Request, res: Response, _next: express.NextFunction): void => {
    const page = req.query.page ? parseInt(req.query.page as string) : 1; // Current page, default to 1
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10; // Items per page, default to 10
    const offset = (page - 1) * limit; // Calculate the offset

    try {
      DB.get<{ totalItems: number }>(
        'SELECT COUNT(*) AS totalItems FROM agent;',
        (err, countRows) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          const totalItems = countRows.totalItems;
          const totalPages = Math.ceil(totalItems / limit);

          const queryAgentsWithCampaigns = `
            SELECT
              Ag.id,
              Ag.first_name,
              Ag.last_name,
              Ag.email,
              Ag.is_active,
              Ag.created_at,
              json_group_array(json_object('campaign_id', CpAg.campaign_id, 'name', Cp.name)) AS campaigns
            FROM agent AS Ag
            JOIN campaign_agent AS CpAg
              ON Ag.id = CpAg.agent_id
            JOIN campaign AS Cp
              ON Cp.id = CpAg.campaign_id
            GROUP BY Ag.id
            LIMIT ?
            OFFSET ?;
          `;
          DB.all<AgentDbQuery>(
            queryAgentsWithCampaigns,
            [limit, offset],
            (err, rows) => {
              if (err) {
                res.status(500).json({ error: err.message });
                return;
              }
              res.status(200).json({
                agents: rows.map((item) => {
                  return {
                    ...item,
                    campaigns: JSON.parse(item.campaigns),
                  };
                }),
                pager: { limit, offset, page, totalItems, totalPages },
              });
            }
          );
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
  (req: Request, res: Response, _next: express.NextFunction): void => {
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
 * PUT route to UPDATE a specific agent in the `agent` table
 */
router.put(
  '/:agentId',
  (req: Request, res: Response, _next: express.NextFunction): void => {
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

/**
 * PUT route to UPDATE a specific agent in the `agent` table
 */
router.put(
  '/:agentId/active/toggle',
  (req: Request, res: Response, _next: express.NextFunction): void => {
    try {
      const query = `UPDATE agent
        SET is_active = CASE is_active
                          WHEN 0 THEN 1
                          WHEN 1 THEN 0
                        END
        WHERE id = ?;`;
      const { agentId } = req.params;

      DB.run(query, [agentId], (err: Error, rows: { id: number }[]) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.status(200).json({ agent: rows });
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: { message: 'Internal Server Error', info: error } });
    }
  }
);

/**
 * DELETE route to remove an agent from the `agent` table based on agent's ID
 */
router.delete('/:agentId', (req: Request, res: Response): void => {
  try {
    const query = `DELETE FROM agent WHERE id = ?;`;
    const { agentId } = req.params;

    DB.run(query, [agentId], (err: Error, rows: { id: number }[]) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(200).json({ agent: rows });
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: { message: 'Internal Server Error', info: error } });
  }
});

export { router as agentRouter };
