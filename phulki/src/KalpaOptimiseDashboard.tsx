import { useState } from "react";

import {
  BarChart,
  CloudCog,
  DollarSign,
  Download,
  FileText,
  LineChart,
  PieChart,
  Settings,
  TrendingDown,
  Upload,
  Users
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

export default function KalpaOptimiseDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

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
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeTab === "overview"}
                      onClick={() => setActiveTab("overview")}
                    >
                      <LineChart className="h-4 w-4" />
                      <span>Overview</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActiveTab("recommendations")}
                    >
                      <TrendingDown className="h-4 w-4" />
                      <span>Recommendations</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveTab("reports")}>
                      <FileText className="h-4 w-4" />
                      <span>Reports</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Upload className="h-4 w-4" />
                      <span>Upload CUR</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Users className="h-4 w-4" />
                      <span>Team Access</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <Button variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex-1">
              <h1 className="text-lg font-semibold">
                AWS Cost Optimisation Dashboard
              </h1>
            </div>
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Upload New CUR
            </Button>
          </header>

          <main className="container mx-auto p-4 md:p-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-4"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="recommendations">
                  Recommendations
                </TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <MetricCard
                    title="Current Monthly Cost"
                    value="$12,450"
                    trend="+8%"
                    trendType="negative"
                    icon={<DollarSign className="h-4 w-4" />}
                  />
                  <MetricCard
                    title="Potential Savings"
                    value="$3,280"
                    trend="26%"
                    trendType="positive"
                    icon={<TrendingDown className="h-4 w-4" />}
                  />
                  <MetricCard
                    title="Optimized Cost"
                    value="$9,170"
                    trend="-26%"
                    trendType="positive"
                    icon={<DollarSign className="h-4 w-4" />}
                  />
                  <MetricCard
                    title="Recommendations"
                    value="14"
                    trend="+2"
                    trendType="neutral"
                    icon={<Settings className="h-4 w-4" />}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Cost Breakdown</CardTitle>
                      <CardDescription>
                        Current AWS service cost distribution
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80 w-full">
                        <CostBreakdownChart />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Cost Trend</CardTitle>
                      <CardDescription>Last 3 months spending</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80 w-full">
                        <CostTrendChart />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Pricing Model Analysis</CardTitle>
                    <CardDescription>
                      Current vs. Optimized distribution
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <h3 className="mb-2 text-sm font-medium">
                          Current Distribution
                        </h3>
                        <div className="space-y-4">
                          <PricingModelItem
                            label="On-Demand Instances"
                            value={75}
                            cost="$9,337.50"
                          />
                          <PricingModelItem
                            label="Reserved Instances"
                            value={20}
                            cost="$2,490.00"
                          />
                          <PricingModelItem
                            label="Spot Instances"
                            value={5}
                            cost="$622.50"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="mb-2 text-sm font-medium">
                          Recommended Distribution
                        </h3>
                        <div className="space-y-4">
                          <PricingModelItem
                            label="On-Demand Instances"
                            value={40}
                            cost="$3,668.00"
                          />
                          <PricingModelItem
                            label="Reserved Instances"
                            value={45}
                            cost="$4,126.50"
                          />
                          <PricingModelItem
                            label="Spot Instances"
                            value={15}
                            cost="$1,375.50"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>AI-Powered Recommendations</CardTitle>
                    <CardDescription>
                      Based on your AWS Cost and Usage Report analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <RecommendationItem
                        title="EC2 Instance Rightsizing"
                        description="Replace 5 t2.micro instances with 3 t3.small instances in us-east-1"
                        savings="$420/month"
                        impact="High"
                        category="Compute"
                      />
                      <RecommendationItem
                        title="Reserved Instance Purchase"
                        description="Purchase 3-year RI for consistently running m5.xlarge instances"
                        savings="$850/month"
                        impact="High"
                        category="Pricing Model"
                      />
                      <RecommendationItem
                        title="Unattached EBS Volumes"
                        description="Delete 12 unattached EBS volumes totaling 1.2TB"
                        savings="$120/month"
                        impact="Medium"
                        category="Storage"
                      />
                      <RecommendationItem
                        title="Idle RDS Instances"
                        description="Downsize or terminate 2 RDS instances with <5% utilization"
                        savings="$380/month"
                        impact="Medium"
                        category="Database"
                      />
                      <RecommendationItem
                        title="Underutilized Load Balancers"
                        description="Consolidate 3 load balancers with low traffic"
                        savings="$55/month"
                        impact="Low"
                        category="Networking"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      Implement All Recommendations
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Savings Plan Recommendations</CardTitle>
                    <CardDescription>
                      Optimize your commitment discounts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <SavingsPlanItem
                        type="Compute Savings Plan"
                        term="1 Year"
                        commitment="$4,500/month"
                        savings="$1,350/month"
                        roi="30%"
                      />
                      <SavingsPlanItem
                        type="EC2 Instance Savings Plan"
                        term="3 Years"
                        commitment="$3,200/month"
                        savings="$1,280/month"
                        roi="40%"
                      />
                      <SavingsPlanItem
                        type="SageMaker Savings Plan"
                        term="1 Year"
                        commitment="$800/month"
                        savings="$160/month"
                        roi="20%"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Cost Optimization Reports</CardTitle>
                    <CardDescription>
                      Historical and projected cost analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <ReportItem
                        title="March 2025 Cost Analysis"
                        description="Complete breakdown of AWS costs with optimization opportunities"
                        date="April 2, 2025"
                        type="Monthly Analysis"
                      />
                      <ReportItem
                        title="Q1 2025 Cost Trends"
                        description="Quarterly analysis of spending patterns and recommendations"
                        date="April 1, 2025"
                        type="Quarterly Report"
                      />
                      <ReportItem
                        title="Reserved Instance Utilization"
                        description="Analysis of current RI usage and optimization opportunities"
                        date="March 28, 2025"
                        type="Specialized Report"
                      />
                      <ReportItem
                        title="Compute Resource Efficiency"
                        description="EC2 and container service utilization analysis"
                        date="March 25, 2025"
                        type="Specialized Report"
                      />
                      <ReportItem
                        title="February 2025 Cost Analysis"
                        description="Complete breakdown of AWS costs with optimization opportunities"
                        date="March 3, 2025"
                        type="Monthly Analysis"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Export All Reports
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function MetricCard({ title, value, trend, trendType, icon }) {
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

function PricingModelItem({ label, value, cost }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm">{label}</span>
        <span className="text-sm font-medium">{cost}</span>
      </div>
      <Progress value={value} className="h-2" />
      <div className="text-xs text-muted-foreground">
        {value}% of total cost
      </div>
    </div>
  );
}

function RecommendationItem({ title, description, savings, impact, category }) {
  return (
    <div className="space-y-2 rounded-lg border p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Badge className="bg-emerald-500 hover:bg-emerald-600">{savings}</Badge>
      </div>
      <div className="flex items-center gap-4 pt-2">
        <Badge variant="outline">{category}</Badge>
        <span
          className={`text-xs ${
            impact === "High"
              ? "text-emerald-500"
              : impact === "Medium"
              ? "text-amber-500"
              : "text-blue-500"
          }`}
        >
          {impact} Impact
        </span>
        <div className="ml-auto">
          <Button size="sm">Implement</Button>
        </div>
      </div>
    </div>
  );
}

function SavingsPlanItem({ type, term, commitment, savings, roi }) {
  return (
    <div className="space-y-2 rounded-lg border p-4">
      <div className="flex items-start justify-between">
        <div>
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
        <div className="ml-auto">
          <Button size="sm">Purchase</Button>
        </div>
      </div>
    </div>
  );
}

function ReportItem({ title, description, date, type }) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div className="space-y-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{date}</span>
          <span>•</span>
          <span>{type}</span>
        </div>
      </div>
      <Button variant="outline" size="sm">
        <Download className="mr-2 h-4 w-4" />
        Download
      </Button>
    </div>
  );
}

function CostBreakdownChart() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-center">
        <PieChart className="mx-auto h-24 w-24 text-muted-foreground" />
        <p className="mt-4 text-sm text-muted-foreground">
          Cost breakdown chart showing EC2 (45%), RDS (20%), S3 (15%), and other
          services (20%)
        </p>
      </div>
    </div>
  );
}

function CostTrendChart() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-center">
        <BarChart className="mx-auto h-24 w-24 text-muted-foreground" />
        <p className="mt-4 text-sm text-muted-foreground">
          3-month cost trend showing January ($11,200), February ($11,500), and
          March ($12,450)
        </p>
      </div>
    </div>
  );
}
