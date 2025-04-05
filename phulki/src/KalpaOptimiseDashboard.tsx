import { useState, FormEvent, ChangeEvent } from "react";
import {
  BarChart,
  Check,
  CloudCog,
  CpuIcon,
  DollarSign,
  Download,
  LineChart,
  TrendingDown,
  Upload,
  Loader,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Input } from "./components/ui/input";
import { utilizationData } from "./data/utilizationData";
import { metricsData } from "@/data/metricsData";
import { DialogUtilization } from "@/components/DialogUtilization";
import { RiRecommendations, riUtilizationData } from "./data/RiUtilization";
import { instanceTypes } from "./data/instanceDistribution";
import { Label } from "@/components/ui/label";

export default function KalpaOptimiseDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Form state variables
  const [roleArn, setRoleArn] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [hourlyUtilization, setHourlyUtilization] = useState([
    {
      Hour: "",
      MeanCPUUtilization: 0,
    },
  ]);
  const [openHourlyChart, setOpenHourlyChart] = useState(false);

  // Handle role ARN input change
  const handleArnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setRoleArn(e.target.value);
  };

  // Handle file input change
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile && selectedFile.name.endsWith(".parquet")) {
      setFile(selectedFile);
      setError("");
    } else if (selectedFile) {
      e.target.value = "";
      setFile(null);
      setError("Please upload only Parquet files");
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!roleArn.trim() || !file) {
      setError("Please provide both Role ARN and a Parquet file");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const getSignedUrlResponse = await fetch(
        `https://5ce9usd6he.execute-api.us-east-1.amazonaws.com/pre-signed-url?roleARN=${roleArn}`,
        {
          method: "GET",
        }
      ).then((response) => response.json());
      const signedUrl = getSignedUrlResponse.signedUrl;
      if (!signedUrl) {
        throw new Error("Failed to get signed URL");
      }

      try {
        const requestBody = {
          roleArn,
        };
        const response = await fetch(
          "https://cusatad2yy5avtvs7tauul5h4e0hzcbz.lambda-url.us-east-1.on.aws/",
          {
            method: "POST",
            body: JSON.stringify(requestBody),
          }
        );

        const data: {
          success: boolean;
          analysisId?: string;
          message?: string;
        } = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to upload data");
        }

        console.log(file);
        const uploadResponse = await fetch(signedUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/vnd.apache.parquet",
          },
          body: file,
        });

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload file to S3");
        }
        // Handle successful upload
        console.log("Upload successful:", data);

        // Automatically switch to overview tab on success
        setActiveTab("overview");

        // Clear form
        setRoleArn("");
        setFile(null);
        const fileInput = document.getElementById(
          "curFile"
        ) as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      } catch (err) {
        console.error("Error uploading data:", err);
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while uploading. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error uploading data:", error);
      setError("Failed to upload data");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/30">
        <Sidebar>
          <SidebarHeader className="flex items-center gap-2 px-4 py-2">
            <CloudCog className="h-6 w-6 text-emerald-600" />
            <span className="text-xl font-bold">Kalpa Optimise</span>
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarContent>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroup>
                <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={activeTab === "uploadCUR"}
                        onClick={() => setActiveTab("uploadCUR")}
                      >
                        <Upload className="h-4 w-4" />
                        <span>Upload CUR</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
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
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <Button variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 overflow-auto w-full">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6 w-full">
            <SidebarTrigger />
            <div className="flex-1">
              <h1 className="text-lg font-semibold">
                AWS Cost Optimisation Dashboard
              </h1>
            </div>
          </header>

          <main className="container mx-auto p-4 md:p-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-4"
            >
              {activeTab !== "uploadCUR" && (
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="recommendations">
                    Recommendations
                  </TabsTrigger>
                </TabsList>
              )}

              <TabsContent value="uploadCUR">
                <Card>
                  <CardHeader>
                    <CardTitle>Upload Cost & Usage Report</CardTitle>
                    <CardDescription>
                      Provide your AWS Role ARN and upload your CUR file for
                      analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                      <div className="space-y-2">
                        <Input
                          className="w-full"
                          id="roleArn"
                          placeholder="arn:aws:iam::123456789012:role/example-role"
                          value={roleArn}
                          onChange={handleArnChange}
                          required
                        />
                        <p className="text-sm text-muted-foreground flex">
                          The Role ARN with permissions to cloudwatch data from
                          your AWS Account
                        </p>
                      </div>

                      <div className="flex gap-5">
                        <div className="space-y-2">
                          <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Input
                              id="curFile"
                              type="file"
                              accept=".parquet"
                              onChange={handleFileChange}
                              required
                            />
                            <p className="text-sm text-muted-foreground flex">
                              Upload your AWS Cost & Usage Report (Parquet
                              format)
                            </p>
                          </div>
                        </div>

                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <Loader className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Upload className="mr-2 h-4 w-4" />
                              Upload and Analyze
                            </>
                          )}
                        </Button>
                      </div>
                      {error && <p className="text-sm text-red-500">{error}</p>}
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Rest of your code remains unchanged */}
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <MetricCard
                    title="Total Compute Instances"
                    value={metricsData.totalComputeInstance}
                    icon={<CpuIcon className="h-4 w-4" />}
                  />
                  <MetricCard
                    title="Active RIs"
                    value={metricsData.activeRI}
                    icon={<Check className="h-4 w-4" />}
                  />
                  <MetricCard
                    title="RI Utilization"
                    value={metricsData.riUtilization}
                    icon={<BarChart className="h-4 w-4" />}
                  />
                  <MetricCard
                    title="Potential Savings"
                    value={metricsData.potentialSavings}
                    icon={<DollarSign className="h-4 w-4" />}
                  />
                </div>
                <DialogUtilization
                  utilizationHistory={hourlyUtilization}
                  shouldOpen={openHourlyChart}
                  setShouldOpen={setOpenHourlyChart}
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Reserved Instance Utilization</CardTitle>
                      <CardDescription>
                        Visual breakdown of RI utilization and optimization
                        opportunities
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80 w-full">
                        <RiUtilizationChart />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Instance Type Distribution</CardTitle>
                      <CardDescription>
                        Breakdown by instance family across all compute services
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80 w-full">
                        <InstanceDistribution />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Compute Utilization Analysis</CardTitle>
                      <CardDescription>
                        CPU and memory utilization across all compute instances
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
                          <div>
                            <h3 className="mb-4 text-sm font-medium">
                              CPU Utilization
                            </h3>
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                              {utilizationData
                                .slice(0, 8)
                                .map((instance, i) => {
                                  let bgColor;
                                  if (instance.cpu < 20)
                                    bgColor = "bg-rose-500";
                                  else if (instance.cpu < 40)
                                    bgColor = "bg-rose-300";
                                  else if (instance.cpu < 60)
                                    bgColor = "bg-amber-300";
                                  else if (instance.cpu < 80)
                                    bgColor = "bg-emerald-300";
                                  else bgColor = "bg-emerald-500";

                                  return (
                                    <div
                                      key={`cpu-${i}`}
                                      className={`flex flex-col items-center justify-center rounded-md ${bgColor} p-2 text-white`}
                                      onClick={() => {
                                        setOpenHourlyChart(true);
                                        setHourlyUtilization(
                                          instance.hourlyHistory
                                        );
                                      }}
                                    >
                                      <span className="text-xs font-bold">
                                        {instance.cpu}%
                                      </span>
                                      <span className="text-xs truncate max-w-full">
                                        {instance.id}
                                      </span>
                                      <span className="text-xs">
                                        {instance.type}
                                      </span>
                                      <span className="text-xs opacity-80">
                                        {instance.service}
                                      </span>
                                    </div>
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
                      </div>
                    </CardContent>
                  </Card>
                </div>
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
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

// Your existing components remain the same
interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendType?: "positive" | "negative" | "neutral";
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

function RecommendationItem({
  title,
  description,
  savings,
  impact,
  category,
}: {
  title: string;
  description: string;
  savings: string;
  impact: "High" | "Medium" | "Low";
  category: string;
}) {
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

interface SavingsPlanItemProps {
  type: string;
  term: string;
  commitment: string;
  savings: string;
  roi: string;
}

function SavingsPlanItem({
  type,
  term,
  commitment,
  savings,
  roi,
}: SavingsPlanItemProps) {
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

function RiUtilizationChart() {
  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 mb-6">
        {riUtilizationData.map((item, index) => (
          <div
            key={index}
            className="p-4 rounded-md text-center"
            style={{
              backgroundColor:
                index === 0
                  ? "#D1FAE5"
                  : index === 1
                  ? "#FEF3C7"
                  : index === 2
                  ? "#DBEAFE"
                  : "#FEE2E2",
            }}
          >
            <span
              className="text-lg font-bold"
              style={{
                color:
                  index === 0
                    ? "#047857"
                    : index === 1
                    ? "#D97706"
                    : index === 2
                    ? "#2563EB"
                    : "#DC2626",
              }}
            >
              {item.value}
            </span>
            <p className="text-sm font-medium text-gray-700">{item.label}</p>
            <p className="text-xs text-gray-500">{item.count}</p>
          </div>
        ))}
      </div>
      <h3 className="text-md font-semibold mb-3">
        Top RI Optimization Recommendations
      </h3>
      <div className="space-y-3">
        {RiRecommendations.map((rec, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 border rounded-md shadow-sm"
          >
            <p className="text-sm font-medium text-gray-700">{rec.label}</p>
            <Badge
              className="px-3 py-1 text-white"
              style={{
                backgroundColor:
                  index === 0 ? "#DC2626" : index === 1 ? "#047857" : "#2563EB",
              }}
            >
              {rec.savings}
            </Badge>
          </div>
        ))}
      </div>
    </>
  );
}

function InstanceDistribution() {
  return (
    <>
      {instanceTypes.map((instance) => (
        <div key={instance.family} className="w-full items-center space-x-4 mb-2">
          <div className="flex justify-between w-full px-2">
            <Label htmlFor={instance.family} className="w-24">
              {instance.family}
            </Label>
            <div className="flex">
              <div className="flex text-sm mb-1">
                <span>{instance.count}</span>
                <span>({instance.percentage}%)</span>
              </div>
            </div>
          </div>
          <Progress value={instance.percentage} className="h-6 rounded-sm bg-gray-200" />
        </div>
      ))}
    </>
  );
}
