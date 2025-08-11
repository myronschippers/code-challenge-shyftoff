import { useContext } from 'react';

import ModalEditAgentContext from './ModalEditAgentContext';

export function useModalEditAgentContext() {
  const modalContext = useContext(ModalEditAgentContext);

  if (!modalContext) {
    throw new Error(
      'The useModalEditAgentContext hook must be used within a ModalEditAgent component.'
    );
  }

  return modalContext;
}
