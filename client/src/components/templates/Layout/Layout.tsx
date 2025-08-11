import { type FC } from 'react';
import { Outlet } from 'react-router';
import { Box, Grid, Typography } from '@mui/material';

import { Topper } from '@components/templates/Topper';

import type { LayoutProps } from './types';

const Layout: FC<LayoutProps> = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Grid container spacing={2} direction="column" height="100%">
      <Grid component="header" size={12}>
        <Topper />
      </Grid>
      <Grid component="main" size={12} flexGrow={1}>
        <Box px={{ xs: 2, md: 4 }} py={2}>
          <Outlet />
        </Box>
      </Grid>
      <Grid component="footer" size={12}>
        <Typography
          textAlign="center"
          variant="caption"
          py="1rem"
          component="p"
        >
          &copy; {currentYear} Code Challenge
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Layout;
