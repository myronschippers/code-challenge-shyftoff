import { type FC } from 'react';

import type { ChartKpiDayOfWeekProps } from './types';

const ChartKpiDayOfWeek: FC<ChartKpiDayOfWeekProps> = ({ campaignId }) => {
  return <div>Chart KPI Day of Week for Campaign ID: {campaignId}</div>;
};

export default ChartKpiDayOfWeek;
