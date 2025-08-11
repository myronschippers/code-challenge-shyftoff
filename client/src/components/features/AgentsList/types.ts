import type { Agent } from '@/types';

export type AgentsListProps = {
  title: string;
};

export type TableRowMessageProps = {
  message: string;
  colSpan: number;
};

export type CellActionsProps = {
  label?: string;
  agentId: number;
};

export type AgentsResponse = {
  agents: Agent[];
  pager: {
    limit: number;
    offset: number;
    page: number;
    totalItems: number;
    totalPages: number;
  };
};
