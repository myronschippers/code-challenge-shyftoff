import type { ReactNode } from 'react';

export type ModalEditAgentProps = {
  title?: string;
  children: ReactNode;
};

export type ModalEditAgentContextType = {
  isOpen: boolean;
  agentId: number | null;
  onClose: () => void;
  onOpen: (agentId: number) => void;
};
