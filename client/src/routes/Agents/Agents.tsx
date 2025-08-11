import { Typography } from '@mui/material';

import AgentsList from '@/components/features/AgentsList/AgentsList';

const Agents = () => {
  return (
    <>
      <Typography variant="h1" component="h1">
        Agents Page
      </Typography>
      <AgentsList title="Agents List" />
    </>
  );
};

export default Agents;
