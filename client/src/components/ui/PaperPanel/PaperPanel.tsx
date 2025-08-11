import { useMemo, type FC } from 'react';
import { Paper } from '@mui/material';

import type { PaperPanelProps } from './types';

const PaperPanel: FC<PaperPanelProps> = ({
  children,
  variant = 'standard',
}) => {
  const styleForVariant = useMemo(() => {
    const borderRadius = 6;
    switch (variant) {
      case 'understated':
        return {
          padding: 1,
          borderRadius,
        };
      case 'standard':
        return {
          padding: 3,
          borderRadius,
        };
      default:
        return {};
    }
  }, [variant]);

  return (
    <Paper
      elevation={4}
      square={false}
      sx={{
        ...styleForVariant,
      }}
    >
      {children}
    </Paper>
  );
};

export default PaperPanel;
