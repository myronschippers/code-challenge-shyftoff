export type Agent = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  is_active: boolean;
};

export type CampaignKpiDayOfWeek = {
  id: number;
  name: string;
  description: string;
  day_of_week_number: number;
  total_hours: number;
  day_of_week: string;
};

export type KpiDayOfWeekResp = {
  campaign_kpi_days: CampaignKpiDayOfWeek[];
};
