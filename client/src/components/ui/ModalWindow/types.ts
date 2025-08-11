import type { ReactNode } from 'react';

export type ModalWindowProps = {
  children: ReactNode;
  title?: string;
  onCloseCallback?: () => void;
};
