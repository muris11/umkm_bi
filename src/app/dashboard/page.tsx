import { DashboardContainer } from "@/features/dashboard/components/dashboard-container";
import { loadDashboardData } from "@/features/dashboard/lib/data-loader";

export default async function DashboardPage() {
  const { rawData, meta } = await loadDashboardData();

  return <DashboardContainer rawData={rawData} meta={meta} />;
}
