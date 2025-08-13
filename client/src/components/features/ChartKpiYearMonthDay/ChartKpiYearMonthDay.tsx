import { useState, useMemo, type FC } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Stack,
  Typography,
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

import { PaperPanel } from '@/components/ui/PaperPanel';

import type { KpiYearMonthDayResp } from '@/types';

import type { ChartKpiYearMonthDayProps } from './types';

const ChartKpiYearMonthDay: FC<ChartKpiYearMonthDayProps> = ({
  campaignId,
}) => {
  const [yearMonthDaySetting, setYearMonthDaySetting] = useState<
    'year' | 'month' | 'day'
  >('day');
  const { error, data, isFetching } = useSuspenseQuery<KpiYearMonthDayResp>({
    queryKey: ['kpiYearMonthDay', campaignId],
    queryFn: async () => {
      const response = await fetch(
        `/api/campaigns/${campaignId}/kpi/${yearMonthDaySetting}`
      );
      return await response.json();
    },
  });

  const xAxisData = useMemo(() => {
    if (!data) {
      return [];
    }

    return [
      {
        data: data.campaign_kpi.map((kpiItem) => {
          switch (yearMonthDaySetting) {
            case 'year':
              return new Date(kpiItem.kpi_year);
            case 'month':
              return new Date(`${kpiItem.kpi_year}-${kpiItem.kpi_month}`);
            case 'day':
              return new Date(
                `${kpiItem.kpi_year}-${kpiItem.kpi_month}-${kpiItem.kpi_day}`
              );
          }
        }),
        valueFormatter: (date: Date) => {
          return new Intl.DateTimeFormat('en-US').format(date);
        },
        label: 'Date',
      },
    ];
  }, [data, yearMonthDaySetting]);

  return (
    <PaperPanel>
      <Stack direction="column" spacing={3}>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Typography variant="h5" component="h3">
            KPI Grouped by Day, Month, Year
          </Typography>

          <ButtonGroup variant="text" aria-label="Select Grouping for KPI">
            <Button onClick={() => setYearMonthDaySetting('day')}>Day</Button>
            <Button onClick={() => setYearMonthDaySetting('month')}>
              Month
            </Button>
            <Button onClick={() => setYearMonthDaySetting('year')}>Year</Button>
          </ButtonGroup>
        </Stack>
        <Box>
          {error && <Alert severity="error">{error.message}</Alert>}
          <LineChart
            loading={isFetching}
            xAxis={xAxisData}
            yAxis={[{ width: 50 }]}
            series={[
              {
                dataKey: 'total_hours',
                label: 'Total Hours',
                showMark: true,
                curve: 'linear',
              },
            ]}
            dataset={data?.campaign_kpi ?? undefined}
            height={400}
          />
        </Box>
      </Stack>
    </PaperPanel>
  );
};

export default ChartKpiYearMonthDay;
