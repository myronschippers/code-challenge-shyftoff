import { type FC } from 'react';
import { Stack, Typography } from '@mui/material';

import type { FieldErrorMsgWrapProps } from './types';

const FieldErrorMsgWrap: FC<FieldErrorMsgWrapProps> = ({
  showError,
  message,
  children,
}) => {
  return (
    <Stack spacing={1}>
      {children}
      {showError && (
        <Typography color="error" variant="caption">
          {message ?? 'There was an error.'}
        </Typography>
      )}
    </Stack>
  );
};

export default FieldErrorMsgWrap;
