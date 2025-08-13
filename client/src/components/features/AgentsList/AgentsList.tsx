import { useState, useDeferredValue, type FC } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import {
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { PaperPanel } from '@components/ui/PaperPanel';
import { ModalEditAgent } from '@components/features/ModalEditAgent';

import { columnsConfig } from './configs';
import TableRowMessage from './TableRowMessage';
import type { AgentsListProps, AgentsResponse } from './types';

const AgentsList: FC<AgentsListProps> = ({ title }) => {
  const [currPage, setCurrentPage] = useState(1);
  const deferredPage = useDeferredValue(currPage);
  const { isPending, error, data, isFetching } =
    useSuspenseQuery<AgentsResponse>({
      queryKey: ['agentsList', deferredPage],
      queryFn: async () => {
        const response = await fetch(`/api/agents/?page=${deferredPage}`);
        return await response.json();
      },
    });
  console.log('!!! Agent Data:', data);
  const agentsTable = useReactTable({
    data: data?.agents || [],
    columns: columnsConfig,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <ModalEditAgent>
      <PaperPanel>
        <Typography component="h3" variant="h6">
          {title}
        </Typography>
        <TableContainer>
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

              {isPending && (
                <TableRowMessage
                  message={'Loading...'}
                  colSpan={columnsConfig.length}
                />
              )}
              {isFetching && (
                <TableRowMessage
                  message={'Updating...'}
                  colSpan={columnsConfig.length}
                />
              )}
              {error && (
                <TableRowMessage
                  message={`An error has occurred: ${error.message}`}
                  colSpan={columnsConfig.length}
                />
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </PaperPanel>

      {data && (
        <Stack
          mt={3}
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
          direction="row"
        >
          <IconButton
            aria-label="previous"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currPage === 1}
          >
            <NavigateBeforeIcon />
          </IconButton>

          <PaperPanel variant="understated">
            <Typography variant="caption" px={1}>
              Page {data.pager.page} of {data.pager.totalPages}
            </Typography>
          </PaperPanel>

          <IconButton
            aria-label="next"
            onClick={() =>
              setCurrentPage((prev) =>
                prev !== data.pager.totalPages ? prev + 1 : prev
              )
            }
            disabled={currPage === data.pager.totalPages}
          >
            <NavigateNextIcon />
          </IconButton>
        </Stack>
      )}
    </ModalEditAgent>
  );
};

export default AgentsList;
