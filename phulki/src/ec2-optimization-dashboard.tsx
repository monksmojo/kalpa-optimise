"use client";

import { useState } from "react";
import {
  AlertCircle,
  BarChart,
  Check,
  ChevronDown,
  ChevronUp,
  CloudCog,
  CpuIcon,
  DollarSign,
  Download,
  FileText,
  HelpCircle,
  RefreshCw,
  Search,
  Server,
  Settings,
  TrendingDown,
  Upload
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarTrigger,
  SidebarSeparator
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";

interface MetricCardProps {
  title: string;
  value: string;
  trend: string;
  trendType: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
}

function MetricCard({ title, value, trend, trendType, icon }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p
          className={`text-xs ${
            trendType === "positive"
              ? "text-emerald-500"
              : trendType === "negative"
              ? "text-rose-500"
              : "text-muted-foreground"
          }`}
        >
          {trend} {trendType !== "neutral" && "from last month"}
        </p>
      </CardContent>
    </Card>
  );
}

interface EC2InstanceRecommendationProps {
  id: string;
  type: string;
  region: string;
  pricing: string;
  cpuUtilization: number;
  memoryUtilization: number;
  uptime: string;
  recommendation: string;
  savings: string;
  impact: "High" | "Medium" | "Low";
}

function EC2InstanceRecommendation({
  id,
  type,
  region,
  pricing,
  cpuUtilization,
  memoryUtilization,
  uptime,
  recommendation,
  savings,
  impact
}: EC2InstanceRecommendationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="rounded-lg border"
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <Server className="h-5 w-5 text-muted-foreground" />
          <div>
            <h3 className="font-medium">{id}</h3>
            <p className="text-sm text-muted-foreground">
              {type} • {region} • {pricing}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Badge
            className={
              impact === "High"
                ? "bg-emerald-500"
                : impact === "Medium"
                ? "bg-amber-500"
                : "bg-blue-500"
            }
          >
            {savings}
          </Badge>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              {isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
      <CollapsibleContent>
        <div className="border-t p-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-2 text-sm font-medium">Instance Metrics</h4>
              <div className="space-y-3">
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span>CPU Utilization</span>
                    <span>{cpuUtilization}%</span>
                  </div>
                  <Progress value={cpuUtilization} className="h-2" />
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span>Memory Utilization</span>
                    <span>{memoryUtilization}%</span>
                  </div>
                  <Progress value={memoryUtilization} className="h-2" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Monthly Uptime</span>
                  <span>{uptime}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-medium">Recommendation</h4>
              <p className="text-sm">{recommendation}</p>
              <div className="mt-4 flex items-center gap-2">
                <Button size="sm">Implement</Button>
                <Button variant="outline" size="sm">
                  Ignore
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

interface SavingsOpportunityProps {
  title: string;
  description: string;
  savings: string;
  instances: number;
  icon: React.ReactNode;
}

function SavingsOpportunity({
  title,
  description,
  savings,
  instances,
  icon
}: SavingsOpportunityProps) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{title}</h3>
            <Badge className="bg-emerald-500">{savings}/month</Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {instances} instances affected
            </span>
            <div className="ml-auto">
              <Button size="sm">View Details</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EC2OptimizationDashboard() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-muted/30">
        <Sidebar>
          <SidebarHeader className="flex items-center gap-2 px-4 py-2">
            <CloudCog className="h-6 w-6 text-emerald-600" />
            <span className="text-xl font-bold">Kalpa Optimise</span>
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>EC2 Optimization</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={true}>
                      <Server className="h-4 w-4" />
                      <span>EC2 Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <Button variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Export Recommendations
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex-1">
              <h1 className="text-lg font-semibold">
                EC2 Cost Optimization Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Data
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Upload New CUR
              </Button>
            </div>
          </header>

          <main className="container mx-auto p-4 md:p-6">
            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              <MetricCard
                title="Total EC2 Instances"
                value="78"
                trend="+5"
                trendType="neutral"
                icon={<Server className="h-4 w-4" />}
              />
              <MetricCard
                title="Active RIs"
                value="24"
                trend="+2"
                trendType="neutral"
                icon={<Check className="h-4 w-4" />}
              />
              <MetricCard
                title="RI Utilization"
                value="82%"
                trend="-3%"
                trendType="negative"
                icon={<BarChart className="h-4 w-4" />}
              />
              <MetricCard
                title="Idle Instances"
                value="12"
                trend="+3"
                trendType="negative"
                icon={<AlertCircle className="h-4 w-4" />}
              />
              <MetricCard
                title="Potential Savings"
                value="$5,120"
                trend="+$420"
                trendType="positive"
                icon={<DollarSign className="h-4 w-4" />}
              />
            </div>

            {/* Visual Summary */}
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              {/* RI Utilization Visualization */}
              <Card>
                <CardHeader>
                  <CardTitle>Reserved Instance Utilization</CardTitle>
                  <CardDescription>
                    Visual breakdown of RI utilization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* RI Utilization Distribution */}
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-sm font-medium">
                          Utilization Distribution
                        </h3>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <HelpCircle className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                Utilization below 80% indicates
                                underutilization. Above 95% indicates potential
                                need for additional RIs.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      <div className="grid grid-cols-4 gap-2">
                        <div className="flex flex-col items-center rounded-md bg-emerald-50 p-4">
                          <div className="mb-2 h-20 w-20 rounded-full border-8 border-emerald-500 flex items-center justify-center">
                            <span className="text-lg font-bold">58%</span>
                          </div>
                          <span className="text-xs font-medium">Optimal</span>
                          <span className="text-xs text-muted-foreground">
                            14 RIs
                          </span>
                        </div>
                        <div className="flex flex-col items-center rounded-md bg-amber-50 p-4">
                          <div className="mb-2 h-20 w-20 rounded-full border-8 border-amber-500 flex items-center justify-center">
                            <span className="text-lg font-bold">13%</span>
                          </div>
                          <span className="text-xs font-medium">
                            Overutilized
                          </span>
                          <span className="text-xs text-muted-foreground">
                            3 RIs
                          </span>
                        </div>
                        <div className="flex flex-col items-center rounded-md bg-blue-50 p-4">
                          <div className="mb-2 h-20 w-20 rounded-full border-8 border-blue-500 flex items-center justify-center">
                            <span className="text-lg font-bold">17%</span>
                          </div>
                          <span className="text-xs font-medium">Moderate</span>
                          <span className="text-xs text-muted-foreground">
                            4 RIs
                          </span>
                        </div>
                        <div className="flex flex-col items-center rounded-md bg-rose-50 p-4">
                          <div className="mb-2 h-20 w-20 rounded-full border-8 border-rose-500 flex items-center justify-center">
                            <span className="text-lg font-bold">13%</span>
                          </div>
                          <span className="text-xs font-medium">
                            Underutilized
                          </span>
                          <span className="text-xs text-muted-foreground">
                            3 RIs
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Top RI Recommendations */}
                    <div>
                      <h3 className="mb-4 text-sm font-medium">
                        Top RI Recommendations
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between rounded-lg border p-3">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-rose-500"></div>
                            <span className="text-sm">
                              Modify 3 underutilized RIs
                            </span>
                          </div>
                          <Badge className="bg-emerald-500">$850/month</Badge>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-3">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                            <span className="text-sm">
                              Purchase 5 additional RIs
                            </span>
                          </div>
                          <Badge className="bg-emerald-500">$1,200/month</Badge>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-3">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                            <span className="text-sm">
                              Reassign workloads to better utilize RIs
                            </span>
                          </div>
                          <Badge className="bg-emerald-500">$320/month</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* EC2 Utilization Visualization */}
              <Card>
                <CardHeader>
                  <CardTitle>EC2 Instance Utilization</CardTitle>
                  <CardDescription>
                    CPU and memory utilization across instances
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Utilization Heatmap */}
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h3 className="mb-2 text-sm font-medium">
                          CPU Utilization
                        </h3>
                        <div className="grid grid-cols-5 gap-1">
                          {[...Array(25)].map((_, i) => {
                            // Randomly assign utilization levels for visualization
                            const utilLevel = Math.floor(Math.random() * 5);
                            const bgColor =
                              utilLevel === 0
                                ? "bg-rose-500"
                                : utilLevel === 1
                                ? "bg-rose-300"
                                : utilLevel === 2
                                ? "bg-amber-300"
                                : utilLevel === 3
                                ? "bg-emerald-300"
                                : "bg-emerald-500";
                            return (
                              <div
                                key={`cpu-${i}`}
                                className={`h-6 w-full rounded-sm ${bgColor}`}
                                title={`Instance ${i + 1}`}
                              />
                            );
                          })}
                        </div>
                        <div className="mt-2 flex justify-between text-xs">
                          <span className="text-rose-500">Low (0-20%)</span>
                          <span className="text-amber-500">
                            Medium (40-60%)
                          </span>
                          <span className="text-emerald-500">
                            High (80-100%)
                          </span>
                        </div>
                      </div>

                      <div>
                        <h3 className="mb-2 text-sm font-medium">
                          Memory Utilization
                        </h3>
                        <div className="grid grid-cols-5 gap-1">
                          {[...Array(25)].map((_, i) => {
                            // Randomly assign utilization levels for visualization
                            const utilLevel = Math.floor(Math.random() * 5);
                            const bgColor =
                              utilLevel === 0
                                ? "bg-rose-500"
                                : utilLevel === 1
                                ? "bg-rose-300"
                                : utilLevel === 2
                                ? "bg-amber-300"
                                : utilLevel === 3
                                ? "bg-emerald-300"
                                : "bg-emerald-500";
                            return (
                              <div
                                key={`mem-${i}`}
                                className={`h-6 w-full rounded-sm ${bgColor}`}
                                title={`Instance ${i + 1}`}
                              />
                            );
                          })}
                        </div>
                        <div className="mt-2 flex justify-between text-xs">
                          <span className="text-rose-500">Low (0-20%)</span>
                          <span className="text-amber-500">
                            Medium (40-60%)
                          </span>
                          <span className="text-emerald-500">
                            High (80-100%)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Instance Type Distribution */}
                    <div>
                      <h3 className="mb-2 text-sm font-medium">
                        Instance Type Distribution
                      </h3>
                      <div className="space-y-2">
                        <div>
                          <div className="mb-1 flex items-center justify-between text-xs">
                            <span>m5 family (32)</span>
                            <span>41%</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                            <div className="h-full w-[41%] bg-emerald-500"></div>
                          </div>
                        </div>
                        <div>
                          <div className="mb-1 flex items-center justify-between text-xs">
                            <span>c5 family (18)</span>
                            <span>23%</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                            <div className="h-full w-[23%] bg-blue-500"></div>
                          </div>
                        </div>
                        <div>
                          <div className="mb-1 flex items-center justify-between text-xs">
                            <span>r5 family (14)</span>
                            <span>18%</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                            <div className="h-full w-[18%] bg-amber-500"></div>
                          </div>
                        </div>
                        <div>
                          <div className="mb-1 flex items-center justify-between text-xs">
                            <span>t3 family (10)</span>
                            <span>13%</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                            <div className="h-full w-[13%] bg-rose-500"></div>
                          </div>
                        </div>
                        <div>
                          <div className="mb-1 flex items-center justify-between text-xs">
                            <span>Other (4)</span>
                            <span>5%</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                            <div className="h-full w-[5%] bg-gray-500"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Savings Opportunities */}
            <div className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Top Savings Opportunities</CardTitle>
                    <CardDescription>
                      Potential monthly savings: $5,120
                    </CardDescription>
                  </div>
                  <Button>
                    <TrendingDown className="mr-2 h-4 w-4" />
                    Implement All
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <SavingsOpportunity
                      title="Right-sizing Opportunities"
                      description="Optimize instance sizes based on actual usage patterns"
                      savings="$1,840"
                      instances={18}
                      icon={<CpuIcon className="h-5 w-5" />}
                    />

                    <SavingsOpportunity
                      title="Reserved Instance Purchases"
                      description="Convert eligible On-Demand instances to Reserved Instances"
                      savings="$1,650"
                      instances={12}
                      icon={<DollarSign className="h-5 w-5" />}
                    />

                    <SavingsOpportunity
                      title="Idle Resource Termination"
                      description="Terminate or schedule instances with consistently low utilization"
                      savings="$920"
                      instances={8}
                      icon={<AlertCircle className="h-5 w-5" />}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* EC2 Instance Recommendations */}
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>EC2 Instance Recommendations</CardTitle>
                      <CardDescription>
                        Detailed optimization recommendations for each instance
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search instances..."
                        className="w-64"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <EC2InstanceRecommendation
                      id="i-0a1b2c3d4e5f6"
                      type="m5.xlarge"
                      region="us-east-1a"
                      pricing="On-Demand"
                      cpuUtilization={12}
                      memoryUtilization={18}
                      uptime="720 hours/month"
                      recommendation="Downsize to m5.large based on low CPU/memory utilization"
                      savings="$108/month"
                      impact="Medium"
                    />

                    <EC2InstanceRecommendation
                      id="i-1b2c3d4e5f6g"
                      type="c5.2xlarge"
                      region="us-east-1b"
                      pricing="On-Demand"
                      cpuUtilization={85}
                      memoryUtilization={45}
                      uptime="720 hours/month"
                      recommendation="Purchase Reserved Instance for consistent usage"
                      savings="$240/month"
                      impact="High"
                    />

                    <EC2InstanceRecommendation
                      id="i-2c3d4e5f6g7h"
                      type="r5.large"
                      region="us-east-1c"
                      pricing="On-Demand"
                      cpuUtilization={4}
                      memoryUtilization={8}
                      uptime="720 hours/month"
                      recommendation="Consider termination - instance has been idle for 14 days"
                      savings="$120/month"
                      impact="High"
                    />

                    <EC2InstanceRecommendation
                      id="i-3d4e5f6g7h8i"
                      type="t3.medium"
                      region="us-east-1a"
                      pricing="On-Demand"
                      cpuUtilization={22}
                      memoryUtilization={35}
                      uptime="120 hours/month"
                      recommendation="Use Spot Instances for this short-running workload"
                      savings="$45/month"
                      impact="Medium"
                    />

                    <EC2InstanceRecommendation
                      id="i-4e5f6g7h8i9j"
                      type="m4.large"
                      region="us-east-1d"
                      pricing="Reserved Instance"
                      cpuUtilization={65}
                      memoryUtilization={72}
                      uptime="720 hours/month"
                      recommendation="Upgrade to newer generation (m5.large) for better performance/cost"
                      savings="$30/month"
                      impact="Low"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing 5 of 78 instances. Total potential savings:
                    $2,840/month
                  </div>
                  <Button variant="outline" size="sm">
                    View All Instances
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
