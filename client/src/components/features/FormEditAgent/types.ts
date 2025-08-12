import type { Agent } from '@/types';
import type { PropsWithChildren } from 'react';

export type FormEditAgentProps = {
  agent?: Agent;
  isLoading?: boolean;
  onSuccessCallback?: () => void;
};

export type FieldErrorMsgWrapProps = PropsWithChildren & {
  showError: boolean;
  message?: string;
};

export type FormSchemaType = {
  firstName: string;
  lastName: string;
  email: string;
};
