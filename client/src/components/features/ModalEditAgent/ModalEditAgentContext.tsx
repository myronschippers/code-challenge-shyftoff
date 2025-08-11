import { createContext } from 'react';

import type { ModalEditAgentContextType } from './types';

const ModalEditAgentContext = createContext<ModalEditAgentContextType | null>(
  null
);

export default ModalEditAgentContext;
