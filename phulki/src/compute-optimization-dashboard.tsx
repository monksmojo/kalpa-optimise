import { useState } from "react";
import {
  AlertCircle,
  BarChart,
  Check,
  ChevronDown,
  ChevronUp,
  CloudCog,
  CpuIcon,
  Database,
  DollarSign,
  Download,
  HelpCircle,
  RefreshCw,
  Search,
  Server
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

function MetricCard({ title, value, icon }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

function ComputeInstanceRecommendation({
  id,
  type,
  service,
  region,
  pricing,
  cpuUtilization,
  memoryUtilization,
  uptime,
  recommendation,
  savings,
  impact
}) {
  const [isOpen, setIsOpen] = useState(false);

  const serviceIcon =
    service === "EC2" ? (
      <Server className="h-5 w-5 text-muted-foreground" />
    ) : service === "RDS" ? (
      <Database className="h-5 w-5 text-muted-foreground" />
    ) : (
      <CpuIcon className="h-5 w-5 text-muted-foreground" />
    );

  // Sample historical utilization data for demo
  const cpuHistory = [12, 15, 10, 18, 14, 11, 13, 9, 12, 16, 14, 12];
  const memoryHistory = [18, 22, 19, 25, 20, 17, 19, 16, 18, 21, 19, 18];

  // For right-sizing recommendations, show comparison data
  const showComparison =
    recommendation.includes("Downsize") || recommendation.includes("Upgrade");

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="rounded-lg border"
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          {serviceIcon}
          <div>
            <h3 className="font-medium">{id}</h3>
            <p className="text-sm text-muted-foreground">
              {service} • {type} • {region} • {pricing}
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

                {/* Historical utilization chart */}
                <div className="mt-4">
                  <h4 className="mb-2 text-xs font-medium">
                    90-DAY UTILIZATION HISTORY
                  </h4>
                  <div className="h-24 w-full rounded-md bg-muted/50 p-2">
                    <div className="flex h-full items-end justify-between gap-1">
                      {cpuHistory.map((value, i) => (
                        <div key={i} className="relative flex-1">
                          <div
                            className="absolute bottom-0 w-full bg-emerald-500 rounded-sm"
                            style={{ height: `${value * 2}%` }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                    <span>90 days ago</span>
                    <span>Today</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-medium">Recommendation</h4>
              <p className="text-sm">{recommendation}</p>

              {/* Instance comparison for right-sizing */}
              {showComparison && (
                <div className="mt-4 rounded-md border p-3">
                  <h4 className="text-xs font-medium mb-3">
                    CURRENT VS RECOMMENDED
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Current</span>
                        <span className="font-medium">{type}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>vCPUs</span>
                          <span>{type.includes("xlarge") ? "4" : "2"}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Memory</span>
                          <span>
                            {type.includes("xlarge") ? "16 GB" : "8 GB"}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Cost</span>
                          <span>
                            ${type.includes("xlarge") ? "288" : "144"}/mo
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Recommended</span>
                        <span className="font-medium">
                          {type.replace("xlarge", "large")}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>vCPUs</span>
                          <span>{type.includes("xlarge") ? "2" : "2"}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Memory</span>
                          <span>
                            {type.includes("xlarge") ? "8 GB" : "4 GB"}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs text-emerald-600 font-medium">
                          <span>Cost</span>
                          <span>
                            ${type.includes("xlarge") ? "144" : "72"}/mo
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-4 space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground">
                  IMPLEMENTATION STEPS
                </h4>
                <ul className="text-xs space-y-1 list-disc pl-4">
                  {service === "EC2" && type.includes("m5.xlarge") && (
                    <>
                      <li>Create AMI of the current instance</li>
                      <li>Launch new m5.large instance from the AMI</li>
                      <li>Update DNS/Load Balancer to point to new instance</li>
                      <li>
                        Monitor performance for 48 hours before terminating old
                        instance
                      </li>
                    </>
                  )}
                  {service === "RDS" && (
                    <>
                      <li>Create snapshot of the current database</li>
                      <li>
                        Configure instance scheduler using AWS Instance
                        Scheduler
                      </li>
                      <li>Set schedule: Mon-Fri 8am-8pm</li>
                      <li>
                        Test failover procedures before implementing in
                        production
                      </li>
                    </>
                  )}
                  {service === "EC2" && type.includes("r5.large") && (
                    <>
                      <li>
                        Verify instance is not part of any critical system
                      </li>
                      <li>Back up any data stored on instance volumes</li>
                      <li>Stop instance for 7 days to verify no impact</li>
                      <li>Terminate instance if no issues arise</li>
                    </>
                  )}
                  {service === "Elasticsearch" && (
                    <>
                      <li>
                        Purchase 1-year Reserved Instance for this workload
                      </li>
                      <li>
                        No migration needed - pricing benefit applies
                        automatically
                      </li>
                      <li>Expected ROI: 35% over 1 year period</li>
                    </>
                  )}
                  {service === "EC2" && type.includes("m4.large") && (
                    <>
                      <li>Create AMI of the current instance</li>
                      <li>Launch new m5.large instance from the AMI</li>
                      <li>
                        Benefit from 10% better performance and lower cost
                      </li>
                      <li>Apply existing RI to the new instance</li>
                    </>
                  )}
                </ul>
              </div>

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

function SavingsOpportunity({ title, description, savings, instances, icon }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="rounded-lg border"
    >
      <div className="p-4">
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
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {instances} instances affected
              </span>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  {isOpen ? "Show Less" : "Show Details"}
                  {isOpen ? (
                    <ChevronUp className="ml-2 h-3 w-3" />
                  ) : (
                    <ChevronDown className="ml-2 h-3 w-3" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>
        </div>
      </div>

      <CollapsibleContent>
        <div className="border-t p-4">
          {title.includes("Right-sizing") && (
            <div className="space-y-4">
              {/* Visual representation of right-sizing opportunities */}
              <div className="rounded-md bg-muted/50 p-4">
                <h4 className="text-sm font-medium mb-3">
                  Current vs. Recommended Instance Sizes
                </h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span>i-0a1b2c3d4e5f</span>
                      <div className="flex items-center">
                        <span className="font-medium">m5.xlarge</span>
                        <span className="mx-2">→</span>
                        <span className="font-medium text-emerald-600">
                          m5.large
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-full bg-blue-200 rounded-sm"></div>
                      <div className="h-6 w-1/2 bg-emerald-500 rounded-sm"></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>$108/month savings</span>
                      <span>50% cost reduction</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span>i-2c3d4e5f6g7h</span>
                      <div className="flex items-center">
                        <span className="font-medium">r5.large</span>
                        <span className="mx-2">→</span>
                        <span className="font-medium text-emerald-600">
                          t3.medium
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-full bg-blue-200 rounded-sm"></div>
                      <div className="h-6 w-2/5 bg-emerald-500 rounded-sm"></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>$82/month savings</span>
                      <span>60% cost reduction</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span>db-0a1b2c3d4e</span>
                      <div className="flex items-center">
                        <span className="font-medium">db.m5.large</span>
                        <span className="mx-2">→</span>
                        <span className="font-medium text-emerald-600">
                          db.m5.small
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-full bg-blue-200 rounded-sm"></div>
                      <div className="h-6 w-1/2 bg-emerald-500 rounded-sm"></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>$240/month savings</span>
                      <span>50% cost reduction</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-md bg-muted p-3">
                <h4 className="text-sm font-medium">Specific Opportunities:</h4>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="flex items-center justify-between">
                    <span>i-0a1b2c3d4e5f (m5.xlarge → m5.large)</span>
                    <Badge variant="outline">$108/month</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>i-2c3d4e5f6g7h (r5.large → t3.medium)</span>
                    <Badge variant="outline">$82/month</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>db-0a1b2c3d4e (db.m5.large → db.m5.small)</span>
                    <Badge variant="outline">$240/month</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>es-1b2c3d4e5f (c5.xlarge → c5.large)</span>
                    <Badge variant="outline">$220/month</Badge>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium">
                  Implementation Approach:
                </h4>
                <p className="mt-1 text-sm">
                  Create AMIs/snapshots of existing resources, then migrate to
                  right-sized instances during maintenance windows. Our analysis
                  shows these instances are consistently underutilized over 90
                  days.
                </p>
              </div>
            </div>
          )}

          {title.includes("Reserved Instance") && (
            <div className="space-y-4">
              {/* Visual representation of RI savings */}
              <div className="rounded-md bg-muted/50 p-4">
                <h4 className="text-sm font-medium mb-3">
                  On-Demand vs. Reserved Instance Costs
                </h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span>c5.2xlarge (1-year standard RI)</span>
                      <div className="flex items-center">
                        <span className="font-medium">$576/mo</span>
                        <span className="mx-2">→</span>
                        <span className="font-medium text-emerald-600">
                          $256/mo
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-full bg-blue-200 rounded-sm"></div>
                      <div className="h-6 w-[44%] bg-emerald-500 rounded-sm"></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>$320/month savings</span>
                      <span>56% cost reduction</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span>2x m5.large (3-year convertible RI)</span>
                      <div className="flex items-center">
                        <span className="font-medium">$480/mo</span>
                        <span className="mx-2">→</span>
                        <span className="font-medium text-emerald-600">
                          $200/mo
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-full bg-blue-200 rounded-sm"></div>
                      <div className="h-6 w-[42%] bg-emerald-500 rounded-sm"></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>$280/month savings</span>
                      <span>58% cost reduction</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-md bg-muted p-3">
                <h4 className="text-sm font-medium">
                  Recommended RI Purchases:
                </h4>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="flex items-center justify-between">
                    <span>1x c5.2xlarge (1-year standard RI)</span>
                    <Badge variant="outline">$320/month</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>2x m5.large (3-year convertible RI)</span>
                    <Badge variant="outline">$280/month</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>1x db.r5.large (1-year standard RI)</span>
                    <Badge variant="outline">$180/month</Badge>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium">ROI Analysis:</h4>
                <div className="mt-2 space-y-2">
                  <div className="rounded-md border p-2">
                    <div className="flex justify-between text-sm">
                      <span>1-year RI break-even point:</span>
                      <span className="font-medium">Month 8</span>
                    </div>
                    <div className="mt-1 h-2 w-full bg-muted rounded-full">
                      <div className="h-full w-[66%] bg-emerald-500 rounded-full"></div>
                    </div>
                    <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                      <span>Month 1</span>
                      <span>Month 8</span>
                      <span>Month 12</span>
                    </div>
                  </div>

                  <div className="rounded-md border p-2">
                    <div className="flex justify-between text-sm">
                      <span>3-year RI break-even point:</span>
                      <span className="font-medium">Month 10</span>
                    </div>
                    <div className="mt-1 h-2 w-full bg-muted rounded-full">
                      <div className="h-full w-[28%] bg-emerald-500 rounded-full"></div>
                    </div>
                    <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                      <span>Month 1</span>
                      <span>Month 10</span>
                      <span>Month 36</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {title.includes("Idle Resource") && (
            <div className="space-y-4">
              {/* Visual representation of idle resources */}
              <div className="rounded-md bg-muted/50 p-4">
                <h4 className="text-sm font-medium mb-3">
                  Idle Resource Utilization
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-xs font-medium mb-2">
                      i-2c3d4e5f6g7h (r5.large)
                    </h5>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>CPU Utilization (14-day avg)</span>
                          <span className="text-rose-500 font-medium">4%</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full">
                          <div className="h-full w-[4%] bg-rose-500 rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Memory Utilization (14-day avg)</span>
                          <span className="text-rose-500 font-medium">8%</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full">
                          <div className="h-full w-[8%] bg-rose-500 rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Network Traffic (14-day avg)</span>
                          <span className="text-rose-500 font-medium">
                            0.2 KB/s
                          </span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full">
                          <div className="h-full w-[2%] bg-rose-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-xs font-medium mb-2">
                      i-3d4e5f6g7h8i (t3.medium)
                    </h5>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>CPU Utilization (30-day avg)</span>
                          <span className="text-rose-500 font-medium">0%</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full">
                          <div className="h-full w-[0%] bg-rose-500 rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Memory Utilization (30-day avg)</span>
                          <span className="text-rose-500 font-medium">2%</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full">
                          <div className="h-full w-[2%] bg-rose-500 rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Network Connections (30-day)</span>
                          <span className="text-rose-500 font-medium">0</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full">
                          <div className="h-full w-[0%] bg-rose-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-md bg-muted p-3">
                <h4 className="text-sm font-medium">
                  Idle Resources Identified:
                </h4>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="flex items-center justify-between">
                    <span>
                      i-2c3d4e5f6g7h (r5.large, &lt;5% CPU for 14 days)
                    </span>
                    <Badge variant="outline">$120/month</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>
                      i-3d4e5f6g7h8i (t3.medium, no connections for 30 days)
                    </span>
                    <Badge variant="outline">$45/month</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>3x Unattached EBS volumes (500GB total)</span>
                    <Badge variant="outline">$50/month</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>2x Unused Elastic IPs</span>
                    <Badge variant="outline">$15/month</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>1x Idle Load Balancer (no traffic for 21 days)</span>
                    <Badge variant="outline">$180/month</Badge>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium">Risk Assessment:</h4>
                <p className="mt-1 text-sm">
                  Our analysis indicates these resources are not in use. We
                  recommend stopping instances for 7 days before termination,
                  and tagging EBS volumes for 14 days before deletion to ensure
                  no production impact.
                </p>

                <div className="mt-3 rounded-md border p-2">
                  <h5 className="text-xs font-medium">Termination Timeline</h5>
                  <div className="mt-2 relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-emerald-200 text-emerald-800">
                          Today
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-emerald-200 text-emerald-800">
                          Day 21
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-emerald-200">
                      <div
                        style={{ width: "33%" }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500 relative"
                      >
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-[10px]">
                          Stop
                        </div>
                      </div>
                      <div
                        style={{ width: "33%" }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-300"
                      >
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-[10px]">
                          Monitor
                        </div>
                      </div>
                      <div
                        style={{ width: "34%" }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
                      >
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-[10px]">
                          Terminate
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4">
            <Button size="sm">Implement All</Button>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

// Sample data for utilization visualization - more realistic for a single AWS account
const utilizationData = [
  {
    id: "i-0a1b2c3d4e5f",
    type: "m5.xlarge",
    service: "EC2",
    cpu: 12,
    memory: 18
  },
  {
    id: "i-1b2c3d4e5f6g",
    type: "c5.2xlarge",
    service: "EC2",
    cpu: 85,
    memory: 45
  },
  { id: "i-2c3d4e5f6g7h", type: "r5.large", service: "EC2", cpu: 4, memory: 8 },
  {
    id: "i-3d4e5f6g7h8i",
    type: "t3.medium",
    service: "EC2",
    cpu: 22,
    memory: 35
  },
  {
    id: "db-0a1b2c3d4e",
    type: "db.m5.large",
    service: "RDS",
    cpu: 65,
    memory: 72
  },
  {
    id: "db-1b2c3d4e5f",
    type: "db.r5.xlarge",
    service: "RDS",
    cpu: 18,
    memory: 42
  },
  {
    id: "es-0a1b2c3d4e",
    type: "m5.large.elasticsearch",
    service: "Elasticsearch",
    cpu: 38,
    memory: 55
  },
  {
    id: "es-1b2c3d4e5f",
    type: "c5.xlarge.elasticsearch",
    service: "Elasticsearch",
    cpu: 72,
    memory: 68
  }
];

// Sample data for instance type distribution - more realistic for a single AWS account
const instanceTypeData = [
  { family: "m5 family", count: 8, percentage: 35 },
  { family: "c5 family", count: 5, percentage: 22 },
  { family: "r5 family", count: 4, percentage: 17 },
  { family: "t3 family", count: 3, percentage: 13 },
  { family: "db.m5 family", count: 2, percentage: 9 },
  { family: "db.r5 family", count: 1, percentage: 4 }
];

export default function ComputeOptimizationDashboard() {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <div className="flex items-center gap-2">
          <CloudCog className="h-6 w-6 text-emerald-600" />
          <span className="text-xl font-bold">Kalpa Optimise</span>
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-semibold ml-4">
            AWS Compute Cost Optimization Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        {/* Key Metrics - Updated with more realistic numbers */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <MetricCard
            title="Total Compute Instances"
            value="23"
            icon={<CpuIcon className="h-4 w-4" />}
          />
          <MetricCard
            title="Active RIs"
            value="6"
            icon={<Check className="h-4 w-4" />}
          />
          <MetricCard
            title="RI Utilization"
            value="78%"
            icon={<BarChart className="h-4 w-4" />}
          />
          <MetricCard
            title="Idle Instances"
            value="5"
            icon={<AlertCircle className="h-4 w-4" />}
          />
          <MetricCard
            title="Potential Savings"
            value="$1,840"
            icon={<DollarSign className="h-4 w-4" />}
          />
        </div>

        {/* Visual Summary */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* RI Utilization Visualization - Updated with more realistic numbers */}
          <Card>
            <CardHeader>
              <CardTitle>Reserved Instance Utilization</CardTitle>
              <CardDescription>
                Visual breakdown of RI utilization and optimization
                opportunities
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
                            Utilization below 80% indicates underutilization.
                            Above 95% indicates potential need for additional
                            RIs.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    <div className="flex flex-col items-center rounded-md bg-emerald-50 p-4">
                      <div className="mb-2 h-20 w-20 rounded-full border-8 border-emerald-500 flex items-center justify-center">
                        <span className="text-lg font-bold">50%</span>
                      </div>
                      <span className="text-xs font-medium">Optimal</span>
                      <span className="text-xs text-muted-foreground">
                        3 RIs
                      </span>
                    </div>
                    <div className="flex flex-col items-center rounded-md bg-amber-50 p-4">
                      <div className="mb-2 h-20 w-20 rounded-full border-8 border-amber-500 flex items-center justify-center">
                        <span className="text-lg font-bold">17%</span>
                      </div>
                      <span className="text-xs font-medium">Overutilized</span>
                      <span className="text-xs text-muted-foreground">
                        1 RI
                      </span>
                    </div>
                    <div className="flex flex-col items-center rounded-md bg-blue-50 p-4">
                      <div className="mb-2 h-20 w-20 rounded-full border-8 border-blue-500 flex items-center justify-center">
                        <span className="text-lg font-bold">17%</span>
                      </div>
                      <span className="text-xs font-medium">Moderate</span>
                      <span className="text-xs text-muted-foreground">
                        1 RI
                      </span>
                    </div>
                    <div className="flex flex-col items-center rounded-md bg-rose-50 p-4">
                      <div className="mb-2 h-20 w-20 rounded-full border-8 border-rose-500 flex items-center justify-center">
                        <span className="text-lg font-bold">17%</span>
                      </div>
                      <span className="text-xs font-medium">Underutilized</span>
                      <span className="text-xs text-muted-foreground">
                        1 RI
                      </span>
                    </div>
                  </div>
                </div>

                {/* Top RI Recommendations */}
                <div>
                  <h3 className="mb-4 text-sm font-medium">
                    Top RI Optimization Recommendations
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-rose-500"></div>
                        <span className="text-sm">
                          Modify 1 underutilized RI (m5.xlarge)
                        </span>
                      </div>
                      <Badge className="bg-emerald-500">$210/month</Badge>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                        <span className="text-sm">
                          Purchase 1 additional RI (c5.2xlarge)
                        </span>
                      </div>
                      <Badge className="bg-emerald-500">$320/month</Badge>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        <span className="text-sm">
                          Reassign workloads to better utilize RIs
                        </span>
                      </div>
                      <Badge className="bg-emerald-500">$120/month</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Instance Type Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Instance Type Distribution</CardTitle>
              <CardDescription>
                Breakdown by instance family across all compute services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {instanceTypeData.map((item, index) => (
                  <div key={index}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        {item.family.includes("db") ? (
                          <Database className="h-4 w-4 text-muted-foreground" />
                        ) : item.family.includes("elasticsearch") ? (
                          <Search className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Server className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span>{item.family}</span>
                      </div>
                      <span className="font-medium">
                        {item.count} ({item.percentage}%)
                      </span>
                    </div>
                    <div className="h-8 w-full overflow-hidden rounded-md bg-muted">
                      <div
                        className="h-full bg-gray-400"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Compute Utilization Visualization */}
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
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-4 text-sm font-medium">
                      CPU Utilization
                    </h3>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {utilizationData.slice(0, 8).map((instance, i) => {
                        let bgColor;
                        if (instance.cpu < 20) bgColor = "bg-rose-500";
                        else if (instance.cpu < 40) bgColor = "bg-rose-300";
                        else if (instance.cpu < 60) bgColor = "bg-amber-300";
                        else if (instance.cpu < 80) bgColor = "bg-emerald-300";
                        else bgColor = "bg-emerald-500";

                        return (
                          <div
                            key={`cpu-${i}`}
                            className={`flex flex-col items-center justify-center rounded-md ${bgColor} p-2 text-white`}
                          >
                            <span className="text-xs font-bold">
                              {instance.cpu}%
                            </span>
                            <span className="text-xs truncate max-w-full">
                              {instance.id}
                            </span>
                            <span className="text-xs">{instance.type}</span>
                            <span className="text-xs opacity-80">
                              {instance.service}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-2 flex justify-between text-xs">
                      <span className="text-rose-500">Low (0-20%)</span>
                      <span className="text-amber-500">Medium (40-60%)</span>
                      <span className="text-emerald-500">High (80-100%)</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-4 text-sm font-medium">
                      Memory Utilization
                    </h3>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {utilizationData.slice(0, 8).map((instance, i) => {
                        let bgColor;
                        if (instance.memory < 20) bgColor = "bg-rose-500";
                        else if (instance.memory < 40) bgColor = "bg-rose-300";
                        else if (instance.memory < 60) bgColor = "bg-amber-300";
                        else if (instance.memory < 80)
                          bgColor = "bg-emerald-300";
                        else bgColor = "bg-emerald-500";

                        return (
                          <div
                            key={`mem-${i}`}
                            className={`flex flex-col items-center justify-center rounded-md ${bgColor} p-2 text-white`}
                          >
                            <span className="text-xs font-bold">
                              {instance.memory}%
                            </span>
                            <span className="text-xs truncate max-w-full">
                              {instance.id}
                            </span>
                            <span className="text-xs">{instance.type}</span>
                            <span className="text-xs opacity-80">
                              {instance.service}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-2 flex justify-between text-xs">
                      <span className="text-rose-500">Low (0-20%)</span>
                      <span className="text-amber-500">Medium (40-60%)</span>
                      <span className="text-emerald-500">High (80-100%)</span>
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
            <CardHeader>
              <div>
                <CardTitle>Top Optimization Opportunities</CardTitle>
                <CardDescription>
                  Potential monthly savings: $1,840
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <SavingsOpportunity
                  title="Right-sizing Opportunities"
                  description="Optimize instance sizes based on actual usage patterns"
                  savings="$650"
                  instances={4}
                  icon={<CpuIcon className="h-5 w-5" />}
                />

                <SavingsOpportunity
                  title="Reserved Instance Purchases"
                  description="Convert eligible On-Demand instances to Reserved Instances"
                  savings="$780"
                  instances={3}
                  icon={<DollarSign className="h-5 w-5" />}
                />

                <SavingsOpportunity
                  title="Idle Resource Termination"
                  description="Terminate or schedule instances with consistently low utilization"
                  savings="$410"
                  instances={5}
                  icon={<AlertCircle className="h-5 w-5" />}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Compute Instance Recommendations */}
        <div className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    Compute Instance Optimization Recommendations
                  </CardTitle>
                  <CardDescription>
                    Detailed optimization recommendations for each instance
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Search instances..."
                    className="w-64"
                    prefix={
                      <Search className="h-4 w-4 text-muted-foreground" />
                    }
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ComputeInstanceRecommendation
                  id="i-0a1b2c3d4e5f"
                  type="m5.xlarge"
                  service="EC2"
                  region="us-east-1a"
                  pricing="On-Demand"
                  cpuUtilization={12}
                  memoryUtilization={18}
                  uptime="720 hours/month"
                  recommendation="Downsize to m5.large based on low CPU/memory utilization. This instance has averaged <15% CPU and <20% memory utilization for the past 90 days, making it an ideal candidate for rightsizing."
                  savings="$108/month"
                  impact="Medium"
                />

                <ComputeInstanceRecommendation
                  id="db-0a1b2c3d4e"
                  type="db.m5.large"
                  service="RDS"
                  region="us-east-1b"
                  pricing="On-Demand"
                  cpuUtilization={8}
                  memoryUtilization={15}
                  uptime="720 hours/month"
                  recommendation="Configure instance scheduler to stop during non-business hours (16 hours/day savings). Usage patterns show this database is only accessed during business hours (8am-8pm) on weekdays."
                  savings="$240/month"
                  impact="High"
                />

                <ComputeInstanceRecommendation
                  id="i-2c3d4e5f6g7h"
                  type="r5.large"
                  service="EC2"
                  region="us-east-1c"
                  pricing="On-Demand"
                  cpuUtilization={4}
                  memoryUtilization={8}
                  uptime="720 hours/month"
                  recommendation="Terminate this instance - it has been idle for 14 days with no network traffic and minimal CPU/memory usage. No CloudWatch alarms or metrics indicate this instance is serving production workloads."
                  savings="$120/month"
                  impact="High"
                />

                <ComputeInstanceRecommendation
                  id="es-0a1b2c3d4e"
                  type="m5.large.elasticsearch"
                  service="Elasticsearch"
                  region="us-east-1a"
                  pricing="On-Demand"
                  cpuUtilization={38}
                  memoryUtilization={55}
                  uptime="720 hours/month"
                  recommendation="Purchase 1-year Reserved Instance for this Elasticsearch cluster. Usage has been consistent for the past 6 months, making it an ideal candidate for RI coverage with a 35% cost reduction."
                  savings="$180/month"
                  impact="Medium"
                />

                <ComputeInstanceRecommendation
                  id="i-4e5f6g7h8i9j"
                  type="m4.large"
                  service="EC2"
                  region="us-east-1d"
                  pricing="Reserved Instance"
                  cpuUtilization={65}
                  memoryUtilization={72}
                  uptime="720 hours/month"
                  recommendation="Upgrade to newer generation m5.large for better performance/cost ratio. The m5 family offers approximately 10% better performance at the same or lower cost, with improved network and storage capabilities."
                  savings="$30/month"
                  impact="Low"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing 5 of 23 instances. Total potential savings: $1,840/month
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
