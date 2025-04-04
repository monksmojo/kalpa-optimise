import { LineChartPhulki } from "@/components/charts/LineChart";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { JSX } from "react";

interface LineChartPhulkiProps {
  utilizationHistory: { Hour: string; MeanCPUUtilization: number }[];
  shouldOpen: boolean;
  setShouldOpen: (open: boolean) => void;
}

export function DialogUtilization({
  utilizationHistory,
  shouldOpen,
  setShouldOpen
}: LineChartPhulkiProps): JSX.Element {
  return (
    <Dialog open={shouldOpen} onOpenChange={setShouldOpen}>
      <DialogContent className="lg:max-w-[1024px]">
        <LineChartPhulki
          title="CPU Trend"
          description="CPU Trend per hour for last 30 days"
          data={utilizationHistory}
        />
      </DialogContent>
    </Dialog>
  );
}
