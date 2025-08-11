import { useEffect, type FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { columnsConfig } from './configs';
import type { AgentsListProps } from './types';

const AgentsList: FC<AgentsListProps> = ({ title }) => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['agentsList'],
    queryFn: async () => {
      const response = await fetch('/api/agents');
      console.log('AgentsList - response:', response);
      return await response.json();
    },
  });
  const agentsTable = useReactTable({
    data: data?.agents || [],
    columns: columnsConfig,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    console.log('AgentsList - data:', data);
  }, [data]);

  return (
    <Box>
      <Typography component="h3" variant="h4">
        {title}
      </Typography>
      {isPending && <Typography>Loading...</Typography>}
      {isFetching && <Typography>Updating...</Typography>}
      {error && (
        <Typography>{`An error has occurred: ${error.message}`}</Typography>
      )}
      {data && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              {agentsTable.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell component="th" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {agentsTable.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell component="td" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default AgentsList;
