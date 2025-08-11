import { type FC } from 'react';
import { TableCell, TableRow, Typography } from '@mui/material';

import type { TableRowMessageProps } from './types';

const TableRowMessage: FC<TableRowMessageProps> = ({ message, colSpan }) => {
  return (
    <TableRow>
      <TableCell component="td" colSpan={colSpan}>
        <Typography component="p" textAlign="center">
          {message}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default TableRowMessage;
