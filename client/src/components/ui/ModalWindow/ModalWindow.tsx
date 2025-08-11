import { type FC, type MouseEvent } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Stack, Typography } from '@mui/material';

import { PaperPanel } from '@components/ui/PaperPanel';

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
        // bgcolor: 'background.paper',
        // border: '2px solid #000',
        // padding: 2,
        // boxShadow: 24,
        width: 400,
        zIndex: 1300,
      }}
    >
      <PaperPanel>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          {title && (
            <Typography variant="h6" component="h2" gutterBottom>
              {title}
            </Typography>
          )}
          {onCloseCallback && (
            <IconButton aria-label="previous" onClick={handleClose}>
              <CloseIcon aria-label="close" />
            </IconButton>
          )}
        </Stack>
        {children}
      </PaperPanel>
    </Box>
  );
};

export default ModalWindow;
