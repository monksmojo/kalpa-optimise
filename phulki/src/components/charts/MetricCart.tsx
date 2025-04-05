import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Your existing components remain the same
interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendType?: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
}

export function MetricCard({
  title,
  value,
  trend,
  trendType,
  icon
}: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl pb-3 font-bold">{value}</div>
        <p
          className={`text-xs ${
            trendType === "positive"
              ? "text-emerald-500"
              : trendType === "negative"
              ? "text-rose-500"
              : "text-muted-foreground"
          }`}
        >
          {trend} {trendType !== "neutral"}
        </p>
      </CardContent>
    </Card>
  );
}
