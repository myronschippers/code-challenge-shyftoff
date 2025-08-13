import { type FC } from 'react';

import type { ChartKpiYearMonthDayProps } from './types';

const ChartKpiYearMonthDay: FC<ChartKpiYearMonthDayProps> = ({
  campaignId,
}) => {
  return <div>Chart KPI Year Month Day Campaign ID: {campaignId}</div>;
};

export default ChartKpiYearMonthDay;
