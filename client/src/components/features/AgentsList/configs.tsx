import { createColumnHelper } from '@tanstack/react-table';
import { Typography } from '@mui/material';

import type { Agent } from '@/types';

import CellActions from './CellActions';
import CellStatus from './CellStatus';

const columnHelper = createColumnHelper<Agent>();

export const columnsConfig = [
  columnHelper.accessor('id', {
    header: 'ID',
  }),
  columnHelper.accessor('is_active', {
    header: 'Status',
    cell: ({ row }) => {
      return (
        <CellStatus
          isActive={row.original.is_active}
          agentId={row.original.id}
        />
      );
    },
  }),
  columnHelper.accessor('first_name', {
    header: 'First Name',
  }),
  columnHelper.accessor('last_name', {
    header: 'Last Name',
  }),
  columnHelper.accessor('email', {
    header: 'Email',
  }),
  columnHelper.accessor('created_at', {
    header: 'Created At',
    cell: ({ getValue }) => {
      const dateStr = getValue();
      const date = new Date(dateStr);
      // Format for English (United States)
      const usFormatter = new Intl.DateTimeFormat('en-US');
      return <Typography>{usFormatter.format(date)}</Typography>;
    },
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <CellActions agentId={row.original.id} />,
  }),
];
