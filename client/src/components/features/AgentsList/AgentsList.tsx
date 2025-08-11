import { useEffect, type FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Typography } from '@mui/material';

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
      {data && <Typography>Agents Found</Typography>}
    </Box>
  );
};

export default AgentsList;
