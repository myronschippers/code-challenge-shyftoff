import { useMemo, useState, type FC } from 'react';
import { Modal, Stack } from '@mui/material';

import { FormEditAgent } from '@components/features/FormEditAgent';
import { ModalWindow } from '@components/ui/ModalWindow';

import ModalEditAgentContext from './ModalEditAgentContext';
import type { ModalEditAgentProps } from './types';

const ModalEditAgent: FC<ModalEditAgentProps> = ({
  title = 'Edit Agent',
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [agentId, setAgentId] = useState<number | null>(null);

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
            <FormEditAgent isLoading={false} />
          </ModalWindow>
        </Stack>
      </Modal>
    </ModalEditAgentContext.Provider>
  );
};

export default ModalEditAgent;
