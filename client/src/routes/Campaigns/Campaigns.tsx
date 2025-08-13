import { useState } from 'react';
import { Grid } from '@mui/material';

import { ChartKpiDayOfWeek } from '@/components/features/ChartKpiDayOfWeek';
import { ChartKpiYearMonthDay } from '@/components/features/ChartKpiYearMonthDay';
import { PgHeading } from '@/components/ui/PgHeading';

const Campaigns = () => {
  const [campaignId] = useState(1);

  return (
    <>
      <PgHeading text="Campaigns" />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <ChartKpiYearMonthDay campaignId={campaignId} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <ChartKpiDayOfWeek campaignId={campaignId} />
        </Grid>
      </Grid>
    </>
  );
};

export default Campaigns;
