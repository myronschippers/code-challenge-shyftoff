import { type FC } from 'react';
import { Title } from '@mui/icons-material';

import type { AgentsListProps } from './types';

const AgentsList: FC<AgentsListProps> = ({ title }) => {
  return <Title>{title}</Title>;
};

export default AgentsList;
