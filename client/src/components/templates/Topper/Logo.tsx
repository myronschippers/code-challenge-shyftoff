import { type FC } from 'react';
import { Box, SvgIcon } from '@mui/material';

import ShiftOffLogo from '@/assets/shyftoff-logo.svg?react';

import type { LogoProps } from './types';

const Logo: FC<LogoProps> = ({ sx }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: { xs: 10, md: 0 },
        borderTopLeftRadius: { xs: 10, md: 0 },
        p: 1,
        pl: { xs: 1, md: 4 },
        mr: 1,
        width: '160px',
        height: '100%',
        backgroundColor: '#020005ff',
        ...sx,
      }}
    >
      <SvgIcon
        component={ShiftOffLogo}
        sx={{ width: '100%' }}
        viewBox="0 0 208 49"
      />
    </Box>
  );
};

export default Logo;
