import { type FC } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Alert } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

import { PaperPanel } from '@/components/ui/PaperPanel';
import type { KpiDayOfWeekResp } from '@/types';

import type { ChartKpiDayOfWeekProps } from './types';

const ChartKpiDayOfWeek: FC<ChartKpiDayOfWeekProps> = ({ campaignId }) => {
  const { error, data, isFetching } = useSuspenseQuery<KpiDayOfWeekResp>({
    queryKey: ['kpiDayOfWeek', campaignId],
    queryFn: async () => {
      const response = await fetch(
        `/api/campaigns/${campaignId}/kpi/day-of-week`
      );
      return await response.json();
    },
  });

  const chartSetting = {
    yAxis: [
      {
        width: 0,
        disableLine: true,
        disableTicks: true,
      },
    ],
    series: [
      {
        dataKey: 'total_hours',
        label: 'KPI Hours',
        valueFormatter: (value: number | null) => {
          return `${value}hrs`;
        },
      },
    ],
    height: 200,
    margin: { left: 0 },
  };

  return (
    <PaperPanel>
      {error && <Alert severity="error">{error.message}</Alert>}
      <BarChart
        loading={isFetching}
        dataset={data?.campaign_kpi_days ?? undefined}
        xAxis={[
          {
            dataKey: 'day_of_week',
            tickPlacement: 'middle',
            tickLabelPlacement: 'middle',
            valueFormatter: (value: string) => {
              return value[0];
            },
          },
        ]}
        {...chartSetting}
      />
    </PaperPanel>
  );
};

export default ChartKpiDayOfWeek;
