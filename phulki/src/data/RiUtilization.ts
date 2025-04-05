const riUtilizationData = [
  { label: "Optimal", value: "50%", count: "3 RIs" },
  { label: "Overutilized", value: "17%", count: "1 RI" },
  { label: "Moderate", value: "17%", count: "1 RI" },
  { label: "Underutilized", value: "17%", count: "1 RI" },
];

const RiRecommendations = [
  { label: "Modify 1 underutilized RI (m5.xlarge)", savings: "$210/month" },
  { label: "Purchase 1 additional RI (c5.2xlarge)", savings: "$320/month" },
  { label: "Reassign workloads to better utilize RIs", savings: "$120/month" },
];

export { riUtilizationData, RiRecommendations };