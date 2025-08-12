import { type FC } from 'react';
import { Typography } from '@mui/material';

import type { PgHeadingProps } from './types';

const PgHeading: FC<PgHeadingProps> = ({ text }) => {
  return (
    <Typography
      variant="h4"
      component="h1"
      fontWeight={700}
      gutterBottom
      textTransform="uppercase"
    >
      {text}
    </Typography>
  );
};

export default PgHeading;
