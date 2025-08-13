import { useState, type FC, type MouseEvent } from 'react';
import {
  useSuspenseQuery,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';
import AddTaskIcon from '@mui/icons-material/AddTask';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Chip,
  IconButton,
  CircularProgress,
  Menu,
  MenuItem,
  Stack,
} from '@mui/material';

import type { AgentCampaign, CampaignsResp, Campaign } from '@/types';

import type { CellCampaignsProps, AssignedCampaignPayload } from './types';

const CellCampaigns: FC<CellCampaignsProps> = ({ campaigns, agentId }) => {
  const [addCampaignElement, setAddCampaignElement] = useState<Element | null>(
    null
  );
  const open = Boolean(addCampaignElement);
  const queryClient = useQueryClient();
  const { data: campaignsData, isFetching } = useSuspenseQuery<CampaignsResp>({
    queryKey: ['campaignsList'],
    queryFn: async () => {
      const response = await fetch(`/api/campaigns/`);
      return await response.json();
    },
  });
  const { mutateAsync: removeAssignedCampaign } = useMutation({
    mutationFn: async ({ agentId, campaignId }: AssignedCampaignPayload) => {
      await fetch(`/api/agents/${agentId}/campaign/${campaignId}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['agentsList'],
      });
    },
  });
  const { mutateAsync: assignedCampaign } = useMutation({
    mutationFn: async ({ agentId, campaignId }: AssignedCampaignPayload) => {
      await fetch(`/api/agents/${agentId}/campaign/${campaignId}`, {
        method: 'POST',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['agentsList'],
      });
    },
  });

  const handleDelete = (campaign: AgentCampaign) => async () => {
    removeAssignedCampaign({
      campaignId: campaign.campaign_id,
      agentId,
    });
  };

  const handleOpenAdd = (e: MouseEvent<HTMLButtonElement>) => {
    setAddCampaignElement(e.currentTarget);
  };

  const handleCloseAdd = async () => {
    setAddCampaignElement(null);
  };

  const handleAddCampaign = (campaign: Campaign) => () => {
    assignedCampaign({
      agentId,
      campaignId: campaign.id,
    });
    setAddCampaignElement(null);
  };

  return (
    <Stack dir="column" spacing={1} alignItems="center">
      {campaigns.length > 0 &&
        campaigns.map((campaignItem) => (
          <Chip
            key={campaignItem.campaign_id}
            label={campaignItem.name}
            variant="outlined"
            onDelete={handleDelete(campaignItem)}
            deleteIcon={<DeleteIcon />}
          />
        ))}

      <IconButton
        aria-label="add campaign"
        size="small"
        color="info"
        onClick={handleOpenAdd}
      >
        <AddTaskIcon fontSize="small" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={addCampaignElement}
        open={open}
        onClose={handleCloseAdd}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        {isFetching && <CircularProgress />}
        {campaignsData?.campaigns &&
          campaignsData?.campaigns.map((campaignForMenu) => {
            return (
              <MenuItem
                key={campaignForMenu.id}
                onClick={handleAddCampaign(campaignForMenu)}
              >
                {campaignForMenu.name}
              </MenuItem>
            );
          })}
      </Menu>
    </Stack>
  );
};

export default CellCampaigns;
