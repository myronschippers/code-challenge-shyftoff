import { useState } from 'react';
import { Grid } from '@mui/material';

import { ChartKpiDayOfWeek } from '@/components/features/ChartKpiDayOfWeek';
import { PaperPanel } from '@/components/ui/PaperPanel';
import { PgHeading } from '@/components/ui/PgHeading';

const Campaigns = () => {
  const [campaignId] = useState(1);

  return (
    <>
      <PgHeading text="Campaigns" />
      <Grid container spacing={3}>
        <Grid size={7}>
          <PaperPanel>Main Campaign Content</PaperPanel>
        </Grid>
        <Grid size={5}>
          <ChartKpiDayOfWeek campaignId={campaignId} />
        </Grid>
      </Grid>
    </>
  );
};

export default Campaigns;
