"use client";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";

const chartConfig = {
  visitors: {
    label: "Visitors"
  },
  cpuPercent: {
    label: "CPU Percent",
    color: "hsl(var(--chart-1))"
  }
} satisfies ChartConfig;

interface LineChartPhulkiProps {
  title: string;
  description: string;
  data: {
    id: string;
    type: string;
    service: string;
    cpu: number;
    memory: number;
    hourlyHistory: { Hour: string; MeanUtilization: number }[];
  }[];
}

export function LineChartPhulki({
  title,
  description,
  data = []
}: LineChartPhulkiProps) {
  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={data[0].hourlyHistory}>
            <defs>
              <linearGradient id="fillCPU" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-cpuPercent)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-cpuPercent)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="Hour"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              minTickGap={20}
              // tickFormatter={(value) => {
              //   value;
              // }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    console.log("🚀 ~ value:", value);
                    return "Hour: " + value;
                  }}
                  indicator="dot"
                />
              }
            />

            <Area
              dataKey="MeanCPUUtilization"
              type="natural"
              fill="url(#fillCPU)"
              stroke="var(--color-cpuPercent)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
