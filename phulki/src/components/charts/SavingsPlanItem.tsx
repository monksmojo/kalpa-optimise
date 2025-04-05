import { Badge } from "@/components/ui/badge";

interface SavingsPlanItemProps {
  type: string;
  term: string;
  commitment: string;
  savings: string;
  roi: string;
}

export function SavingsPlanItem({
  type,
  term,
  commitment,
  savings,
  roi
}: SavingsPlanItemProps) {
  return (
    <div className="space-y-2 rounded-lg border p-4">
      <div className="flex items-start justify-between">
        <div className="text-start">
          <h3 className="font-medium">{type}</h3>
          <p className="text-sm text-muted-foreground">
            {term} term commitment
          </p>
        </div>
        <Badge className="bg-emerald-500 hover:bg-emerald-600">{savings}</Badge>
      </div>
      <div className="flex items-center gap-4 pt-2">
        <span className="text-sm">Commitment: {commitment}</span>
        <span className="text-sm text-emerald-500">ROI: {roi}</span>
      </div>
    </div>
  );
}
