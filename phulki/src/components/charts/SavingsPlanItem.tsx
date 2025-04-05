import { Badge } from "@/components/ui/badge";

interface SavingsPlanItemProps {
  name: string;
  savings: string;
  reason: string;
}

export function SavingsPlanItem({
  name,
  savings,
  reason
}: SavingsPlanItemProps) {
  return (
    <div className="space-y-2 rounded-lg border p-4">
      <div className="flex items-start justify-between">
        <div className="text-start">
          <h3 className="font-medium">{name}</h3>
        </div>
        <Badge className="bg-emerald-500 hover:bg-emerald-600">{savings}</Badge>
      </div>
      <div className="flex items-center gap-4 pt-2">
        <span className="text-sm text-emerald-500">{reason}</span>
      </div>
    </div>
  );
}
