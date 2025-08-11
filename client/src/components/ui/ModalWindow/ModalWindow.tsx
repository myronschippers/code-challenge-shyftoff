import { type FC, type MouseEvent } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Stack, Typography } from '@mui/material';

import type { ModalWindowProps } from './types';

const ModalWindow: FC<ModalWindowProps> = ({
  children,
  title,
  onCloseCallback,
}) => {
  const handleClose = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (onCloseCallback) {
      onCloseCallback();
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        borderRadius: 6,
        width: 500,
        overflow: 'hidden',
        zIndex: 1300,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        sx={{ bgcolor: '#5822B3', px: 2, pt: 2, pb: 1, width: '100%' }}
      >
        {title && (
          <Typography variant="h6" component="h2" fontWeight={600}>
            {title}
          </Typography>
        )}
        {onCloseCallback && (
          <IconButton
            aria-label="previous"
            onClick={handleClose}
            sx={{ ml: 'auto' }}
          >
            <CloseIcon aria-label="close" />
          </IconButton>
        )}
      </Stack>
      <Box sx={{ px: 2, pb: 2, pt: 2 }}>{children}</Box>
    </Box>
  );
};

export default ModalWindow;
