import { type FC } from 'react';
import { Grid } from '@mui/material';

import { Topper } from '@components/templates/Topper';

import type { LayoutProps } from './types';

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Grid container spacing={2} direction="column" height="100%">
      <Grid component="header" size={12}>
        <Topper />
      </Grid>
      <Grid component="main" size={12} flexGrow={1}>
        {children}
      </Grid>
      <Grid component="footer" size={12}>
        <p>&copy; 2023 My Application</p>
      </Grid>
    </Grid>
  );
};

export default Layout;
