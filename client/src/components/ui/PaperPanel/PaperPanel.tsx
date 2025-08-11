import { type FC } from 'react';
import { Paper } from '@mui/material';

import type { PaperPanelProps } from './types';

const PaperPanel: FC<PaperPanelProps> = ({ children }) => {
  return (
    <Paper
      elevation={4}
      square={false}
      sx={{
        padding: 3,
        height: '100%',
        borderRadius: 6,
      }}
    >
      {children}
    </Paper>
  );
};

export default PaperPanel;
