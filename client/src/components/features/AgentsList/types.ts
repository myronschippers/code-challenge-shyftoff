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

export type Agent = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  is_active: boolean;
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
