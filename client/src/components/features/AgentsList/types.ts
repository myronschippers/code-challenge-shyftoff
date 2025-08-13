import type { Agent, AgentCampaign } from '@/types';

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

export type CellStatusProps = {
  isActive: boolean;
  agentId: number;
};

export type CellCampaignsProps = {
  agentId: number;
  campaigns: AgentCampaign[];
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
