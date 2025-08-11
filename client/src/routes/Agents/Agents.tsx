import { Typography } from '@mui/material';

import AgentsList from '@/components/features/AgentsList/AgentsList';

const Agents = () => {
  return (
    <>
      <Typography
        variant="h4"
        component="h1"
        fontWeight={700}
        gutterBottom
        textTransform="uppercase"
      >
        Agents
      </Typography>
      <AgentsList title="Current Agents" />
    </>
  );
};

export default Agents;
