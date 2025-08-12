import { type FC } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Chip } from '@mui/material';

import type { CellStatusProps } from './types';

const CellStatus: FC<CellStatusProps> = ({ isActive, agentId }) => {
  const queryClient = useQueryClient();

  const { mutateAsync: toggleAgentActiveStatus } = useMutation({
    mutationFn: async (agentId: number) => {
      const response = await fetch(`/api/agents/${agentId}/active/toggle`, {
        method: 'PUT',
      });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agentsList'] });
    },
  });

  const handleClickToggle = () => {
    toggleAgentActiveStatus(agentId);
  };

  return (
    <Chip
      icon={<SupportAgentIcon />}
      label={isActive ? 'Active' : 'Inactive'}
      color={isActive ? 'primary' : 'error'}
      onClick={handleClickToggle}
      variant="outlined"
    />
  );
};

export default CellStatus;
