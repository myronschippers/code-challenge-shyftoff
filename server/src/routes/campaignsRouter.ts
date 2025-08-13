import express, { type Request, type Response } from 'express';

import DB from '../db_connect';

const router: express.Router = express.Router();

type CampaignKpiAsDayOfWeek = {
  id: number;
  name: string;
  description: string;
  day_of_week_number: number;
  total_hours_for_campaign: number;
};

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

/**
 * GET Campaign KPIs grouped by days of the week to show what high volume days may be
 */
router.get(
  '/:campaignId/kpi/day-of-week',
  (req: Request, res: Response, _next: express.NextFunction): void => {
    try {
      const { campaignId } = req.params;
      const query = `
        SELECT
          camp.id,
          camp.name,
          camp.description,
          CAST(STRFTIME('%w', kpi.date) AS INTEGER) AS day_of_week_number,
          SUM(kpi.hours) AS total_hours
        FROM campaign AS camp
        JOIN campaign_kpi AS kpi
          ON camp.id = kpi.campaign_id
        WHERE
          camp.id = ?
        GROUP BY
          day_of_week_number`;
      DB.all<CampaignKpiAsDayOfWeek>(query, [campaignId], (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }

        const daysOfTheWeek = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ];

        res.status(200).json({
          campaign_kpi_days: rows.map((kpiItem) => {
            return {
              ...kpiItem,
              day_of_week: daysOfTheWeek[kpiItem.day_of_week_number],
            };
          }),
        });
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: { message: 'Internal Server Error', info: error } });
    }
  }
);

/**
 * GET All Campaigns from the `campaign` table with their KPI
 * grouped by sets of..
 * - day, month, and year
 * - month and year
 * - year only
 */
router.get(
  '/:campaignId/kpi/:yearMonthDay',
  (req: Request, res: Response, _next: express.NextFunction): void => {
    const { campaignId, yearMonthDay } = req.params;
    try {
      function makeQueryForYearMonthDay(yearMonthDayCrit: string) {
        switch (yearMonthDayCrit) {
          case 'year':
            const queryKpiYear = `
              SELECT
                camp.id,
                camp.name,
                camp.description,
                STRFTIME('%Y', kpi.date) AS kpi_year,
                SUM(kpi.hours) AS total_hours
              FROM campaign AS camp
              JOIN campaign_kpi AS kpi
                ON camp.id = kpi.campaign_id
              WHERE camp.id = ?
              GROUP BY kpi_year
              ORDER BY kpi_year;`;

            return queryKpiYear;
          case 'month':
            const queryKpiYearMonth = `
              SELECT
                camp.id,
                camp.name,
                camp.description,
                STRFTIME('%Y', kpi.date) AS kpi_year,
                STRFTIME('%m', kpi.date) AS kpi_month,
                SUM(kpi.hours) AS total_hours
              FROM campaign AS camp
              JOIN campaign_kpi AS kpi
                ON camp.id = kpi.campaign_id
              WHERE camp.id = ?
              GROUP BY
                kpi_year,
                kpi_month
              ORDER BY
                kpi_year,
                kpi_month;`;

            return queryKpiYearMonth;
          default:
            const queryKpiYearMonthDay = `
              SELECT
                camp.id,
                camp.name,
                camp.description,
                STRFTIME('%Y', kpi.date) AS kpi_year,
                STRFTIME('%m', kpi.date) AS kpi_month,
                STRFTIME('%d', kpi.date) AS kpi_day,
                SUM(kpi.hours) AS total_hours
              FROM campaign AS camp
              JOIN campaign_kpi AS kpi
                ON camp.id = kpi.campaign_id
              WHERE camp.id = ?
              GROUP BY
                kpi_year,
                kpi_month,
                kpi_day
              ORDER BY
                kpi_year,
                kpi_month,
                kpi_day;`;

            return queryKpiYearMonthDay;
        }
      }

      DB.all(
        makeQueryForYearMonthDay(yearMonthDay),
        [campaignId],
        (err, rows) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }

          res.status(200).json({
            campaigns: rows,
          });
        }
      );
    } catch (error) {
      res
        .status(500)
        .json({ error: { message: 'Internal Server Error', info: error } });
    }
  }
);

export { router as campaignsRouter };
