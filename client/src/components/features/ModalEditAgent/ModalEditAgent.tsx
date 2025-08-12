import { useMemo, useState, type FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Modal, Stack, Typography } from '@mui/material';

import { FormEditAgent } from '@components/features/FormEditAgent';
import { ModalWindow } from '@components/ui/ModalWindow';
import type { Agent } from '@/types';

import ModalEditAgentContext from './ModalEditAgentContext';
import type { ModalEditAgentProps } from './types';

const ModalEditAgent: FC<ModalEditAgentProps> = ({
  title = 'Edit Agent',
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [agentId, setAgentId] = useState<number | null>(null);

  const { error, data, isFetching } = useQuery<Agent>({
    queryKey: ['agentDetails', agentId],
    queryFn: async () => {
      const response = await fetch(`/api/agents/${agentId}`);
      return await response.json();
    },
  });

  const handleOpen = (id: number) => {
    setAgentId(id);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setAgentId(null);
  };

  const providerValues = useMemo(() => {
    return {
      isOpen,
      agentId,
      onClose: handleClose,
      onOpen: handleOpen,
    };
  }, [isOpen, agentId]);

  return (
    <ModalEditAgentContext.Provider value={providerValues}>
      {children}

      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack spacing={2}>
          <ModalWindow title={title} onCloseCallback={handleClose}>
            {!error && data && (
              <FormEditAgent
                key={agentId}
                agent={data}
                isLoading={isFetching}
                onSuccessCallback={() => handleClose()}
              />
            )}
            {error && (
              <Typography color="error">
                There was an error: {error.message}
              </Typography>
            )}
          </ModalWindow>
        </Stack>
      </Modal>
    </ModalEditAgentContext.Provider>
  );
};

export default ModalEditAgent;
