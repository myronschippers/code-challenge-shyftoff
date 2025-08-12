import { Grid } from '@mui/material';

import { PaperPanel } from '@/components/ui/PaperPanel';
import { PgHeading } from '@/components/ui/PgHeading';

const Campaigns = () => {
  return (
    <>
      <PgHeading text="Campaigns" />
      <Grid container spacing={3}>
        <Grid size={7}>
          <PaperPanel>Main Campaign Content</PaperPanel>
        </Grid>
        <Grid size={5}>
          <PaperPanel>Secondary Campaign Content</PaperPanel>
        </Grid>
      </Grid>
    </>
  );
};

export default Campaigns;
