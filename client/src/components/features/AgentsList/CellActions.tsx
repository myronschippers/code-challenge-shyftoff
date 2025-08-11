import { type FC } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Stack, Typography } from '@mui/material';

import type { CellActionsProps } from './types';

const CellActions: FC<CellActionsProps> = ({ label, agentId }) => {
  const queryClient = useQueryClient();

  const { mutateAsync: removeAgent } = useMutation({
    mutationFn: async (agentId: number) => {
      const response = await fetch(`/api/agents/${agentId}`, {
        method: 'DELETE',
      });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agentsList'] });
    },
  });

  const handleDelete = async () => {
    await removeAgent(agentId);
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {label && <Typography>{label}:</Typography>}
      <IconButton
        aria-label="delete"
        size="small"
        color="error"
        onClick={handleDelete}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
};

export default CellActions;
