import { AgentsList } from '@/components/features/AgentsList';
import { PgHeading } from '@/components/ui/PgHeading';

const Agents = () => {
  return (
    <>
      <PgHeading text="Agents" />
      <AgentsList title="Current Agents" />
    </>
  );
};

export default Agents;
