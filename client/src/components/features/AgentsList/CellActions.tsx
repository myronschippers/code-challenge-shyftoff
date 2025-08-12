import { type FC } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import DeleteIcon from '@mui/icons-material/Delete';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import { IconButton, Stack, Tooltip, Typography } from '@mui/material';

import { useModalEditAgentContext } from '@components/features/ModalEditAgent';

import type { CellActionsProps } from './types';

const CellActions: FC<CellActionsProps> = ({ label, agentId }) => {
  const queryClient = useQueryClient();
  const modalContext = useModalEditAgentContext();

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

  const handleEdit = () => {
    if (modalContext) {
      modalContext.onOpen(agentId);
    }
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {label && <Typography>{label}:</Typography>}

      <Tooltip title="Edit Agent">
        <IconButton
          aria-label="edit"
          size="small"
          color="info"
          onClick={handleEdit}
        >
          <EditSquareIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete">
        <IconButton
          aria-label="delete"
          size="small"
          color="error"
          onClick={handleDelete}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default CellActions;
