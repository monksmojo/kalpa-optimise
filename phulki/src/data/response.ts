export const response = {
  accountId: "123456789012",
  region: "us-east-1", //optional
  instanceDistribution: [
    {
      family: "c5 family",
      count: 5,
      percentage: 22
    },
    { family: "mb family", count: 8, percentage: 35 },
    { family: "c5 family", count: 5, percentage: 22 },
    { family: "r5 family", count: 4, percentage: 17 },
    { family: "t3 family", count: 3, percentage: 13 },
    { family: "db.m5 family", count: 2, percentage: 9 },
    { family: "db.r5 family", count: 1, percentage: 4 },
    { family: "db.r5 family", count: 1, percentage: 4 },
    { family: "db.r5 family", count: 1, percentage: 4 },
    { family: "db.r5 family", count: 1, percentage: 4 },
    { family: "db.r5 family", count: 1, percentage: 4 }
  ],
  metrics: {
    totalComputeInstance: 23,
    activeRI: 6,
    riUtilization: "85%",
    potentialSavings: "$1200"
  },
  riUtilizationData: [
    { label: "Optimal", value: "50%", count: "3 RIs" },
    { label: "Overutilized", value: "17%", count: "1 RI" },
    { label: "Moderate", value: "17%", count: "1 RI" },
    { label: "Underutilized", value: "17%", count: "1 RI" }
  ],
  riRecommendations: [
    { label: "Modify 1 underutilized RI (m5.xlarge)", savings: "$210/month" },
    { label: "Purchase 1 additional RI (c5.2xlarge)", savings: "$320/month" },
    { label: "Reassign workloads to better utilize RIs", savings: "$120/month" }
  ],
  utilizationData: [
    {
      id: "i-0a1b2c3d4e5f",
      type: "m5.xlarge",
      service: "EC2",
      cpu: 12,
      memory: 18,
      hourlyHistory: [
        {
          Hour: "0:00",
          MeanCPUUtilization: 3.031377092968584
        },
        {
          Hour: "1:00",
          MeanCPUUtilization: 6.066357627825918
        },
        {
          Hour: "2:00",
          MeanCPUUtilization: 1.0946027595446184
        },
        {
          Hour: "3:00",
          MeanCPUUtilization: 2.652826755927839
        },
        {
          Hour: "4:00",
          MeanCPUUtilization: 9.95026286565549
        },
        {
          Hour: "5:00",
          MeanCPUUtilization: 9.975719606770145
        },
        {
          Hour: "6:00",
          MeanCPUUtilization: 6.150254240874485
        },
        {
          Hour: "7:00",
          MeanCPUUtilization: 10.539039571940744
        },
        {
          Hour: "8:00",
          MeanCPUUtilization: 2.3233889924926427
        },
        {
          Hour: "9:00",
          MeanCPUUtilization: 10.202207641741657
        },
        {
          Hour: "10:00",
          MeanCPUUtilization: 3.3500918376263185
        },
        {
          Hour: "11:00",
          MeanCPUUtilization: 2.7673808075724775
        },
        {
          Hour: "12:00",
          MeanCPUUtilization: 40.39874005752385
        },
        {
          Hour: "13:00",
          MeanCPUUtilization: 27.57649667597588
        },
        {
          Hour: "14:00",
          MeanCPUUtilization: 5.142884859515039
        },
        {
          Hour: "15:00",
          MeanCPUUtilization: 3.0326462969007477
        },
        {
          Hour: "16:00",
          MeanCPUUtilization: 2.72167992927441
        },
        {
          Hour: "17:00",
          MeanCPUUtilization: 4.951835548368724
        },
        {
          Hour: "18:00",
          MeanCPUUtilization: 8.17379877
        },
        {
          Hour: "19:00",
          MeanCPUUtilization: 2.059275114183463
        },
        {
          Hour: "20:00",
          MeanCPUUtilization: 2.780734468676649
        },
        {
          Hour: "21:00",
          MeanCPUUtilization: 5.190570457067995
        },
        {
          Hour: "22:00",
          MeanCPUUtilization: 4.103533314087453
        },
        {
          Hour: "23:00",
          MeanCPUUtilization: 56.18587295300454
        }
      ]
    },
    {
      id: "i-1b2c3d4e5f6g",
      type: "c5.2xlarge",
      service: "EC2",
      cpu: 85,
      memory: 45,
      hourlyHistory: [
        {
          Hour: "0:00",
          MeanCPUUtilization: 70.031377092968
        },
        {
          Hour: "1:00",
          MeanCPUUtilization: 6.066357627825918
        },
        {
          Hour: "2:00",
          MeanCPUUtilization: 3.0946027595446184
        },
        {
          Hour: "3:00",
          MeanCPUUtilization: 2.652826755927839
        },
        {
          Hour: "4:00",
          MeanCPUUtilization: 9.95026286565549
        },
        {
          Hour: "5:00",
          MeanCPUUtilization: 9.975719606770145
        },
        {
          Hour: "6:00",
          MeanCPUUtilization: 6.150254240874485
        },
        {
          Hour: "7:00",
          MeanCPUUtilization: 10.539039571940744
        },
        {
          Hour: "8:00",
          MeanCPUUtilization: 3.3233889924926427
        },
        {
          Hour: "9:00",
          MeanCPUUtilization: 10.202207641741657
        },
        {
          Hour: "10:00",
          MeanCPUUtilization: 3.3500918376263185
        },
        {
          Hour: "11:00",
          MeanCPUUtilization: 2.7673808075724775
        },
        {
          Hour: "12:00",
          MeanCPUUtilization: 40.39874005752385
        },
        {
          Hour: "13:00",
          MeanCPUUtilization: 27.57649667597588
        },
        {
          Hour: "14:00",
          MeanCPUUtilization: 5.142884859515039
        },
        {
          Hour: "15:00",
          MeanCPUUtilization: 3.0326462969007477
        },
        {
          Hour: "16:00",
          MeanCPUUtilization: 2.72167992927441
        },
        {
          Hour: "17:00",
          MeanCPUUtilization: 4.951835548368724
        },
        {
          Hour: "18:00",
          MeanCPUUtilization: 5.173798776115688
        },
        {
          Hour: "19:00",
          MeanCPUUtilization: 6.059275114183463
        },
        {
          Hour: "20:00",
          MeanCPUUtilization: 2.780734468676649
        },
        {
          Hour: "21:00",
          MeanCPUUtilization: 5.190570457067995
        },
        {
          Hour: "22:00",
          MeanCPUUtilization: 4.103533314087453
        },
        {
          Hour: "23:00",
          MeanCPUUtilization: 6.1858729530045435
        }
      ]
    },
    {
      id: "i-2c3d4e5f6g7h",
      type: "r5.large",
      service: "EC2",
      cpu: 4,
      memory: 8,
      hourlyHistory: [
        {
          Hour: "0:00",
          MeanCPUUtilization: 3.031377092968584
        },
        {
          Hour: "1:00",
          MeanCPUUtilization: 6.066357627825918
        },
        {
          Hour: "2:00",
          MeanCPUUtilization: 3.0946027595446184
        },
        {
          Hour: "3:00",
          MeanCPUUtilization: 2.652826755927839
        },
        {
          Hour: "4:00",
          MeanCPUUtilization: 9.95026286565549
        },
        {
          Hour: "5:00",
          MeanCPUUtilization: 9.975719606770145
        },
        {
          Hour: "6:00",
          MeanCPUUtilization: 6.150254240874485
        },
        {
          Hour: "7:00",
          MeanCPUUtilization: 10.539039571940744
        },
        {
          Hour: "8:00",
          MeanCPUUtilization: 3.3233889924926427
        },
        {
          Hour: "9:00",
          MeanCPUUtilization: 10.202207641741657
        },
        {
          Hour: "10:00",
          MeanCPUUtilization: 3.3500918376263185
        },
        {
          Hour: "11:00",
          MeanCPUUtilization: 2.7673808075724775
        },
        {
          Hour: "12:00",
          MeanCPUUtilization: 40.39874005752385
        },
        {
          Hour: "13:00",
          MeanCPUUtilization: 27.57649667597588
        },
        {
          Hour: "14:00",
          MeanCPUUtilization: 5.142884859515039
        },
        {
          Hour: "15:00",
          MeanCPUUtilization: 3.0326462969007477
        },
        {
          Hour: "16:00",
          MeanCPUUtilization: 2.72167992927441
        },
        {
          Hour: "17:00",
          MeanCPUUtilization: 4.951835548368724
        },
        {
          Hour: "18:00",
          MeanCPUUtilization: 5.173798776115688
        },
        {
          Hour: "19:00",
          MeanCPUUtilization: 6.059275114183463
        },
        {
          Hour: "20:00",
          MeanCPUUtilization: 2.780734468676649
        },
        {
          Hour: "21:00",
          MeanCPUUtilization: 5.190570457067995
        },
        {
          Hour: "22:00",
          MeanCPUUtilization: 4.103533314087453
        },
        {
          Hour: "23:00",
          MeanCPUUtilization: 6.1858729530045435
        }
      ]
    },
    {
      id: "i-3d4e5f6g7h8i",
      type: "t3.medium",
      service: "EC2",
      cpu: 22,
      memory: 35,
      hourlyHistory: [
        {
          Hour: "0:00",
          MeanCPUUtilization: 3.031377092968584
        },
        {
          Hour: "1:00",
          MeanCPUUtilization: 6.066357627825918
        },
        {
          Hour: "2:00",
          MeanCPUUtilization: 3.0946027595446184
        },
        {
          Hour: "3:00",
          MeanCPUUtilization: 2.652826755927839
        },
        {
          Hour: "4:00",
          MeanCPUUtilization: 9.95026286565549
        },
        {
          Hour: "5:00",
          MeanCPUUtilization: 9.975719606770145
        },
        {
          Hour: "6:00",
          MeanCPUUtilization: 6.150254240874485
        },
        {
          Hour: "7:00",
          MeanCPUUtilization: 10.539039571940744
        },
        {
          Hour: "8:00",
          MeanCPUUtilization: 3.3233889924926427
        },
        {
          Hour: "9:00",
          MeanCPUUtilization: 10.202207641741657
        },
        {
          Hour: "10:00",
          MeanCPUUtilization: 3.3500918376263185
        },
        {
          Hour: "11:00",
          MeanCPUUtilization: 2.7673808075724775
        },
        {
          Hour: "12:00",
          MeanCPUUtilization: 40.39874005752385
        },
        {
          Hour: "13:00",
          MeanCPUUtilization: 27.57649667597588
        },
        {
          Hour: "14:00",
          MeanCPUUtilization: 5.142884859515039
        },
        {
          Hour: "15:00",
          MeanCPUUtilization: 3.0326462969007477
        },
        {
          Hour: "16:00",
          MeanCPUUtilization: 2.72167992927441
        },
        {
          Hour: "17:00",
          MeanCPUUtilization: 4.951835548368724
        },
        {
          Hour: "18:00",
          MeanCPUUtilization: 5.173798776115688
        },
        {
          Hour: "19:00",
          MeanCPUUtilization: 6.059275114183463
        },
        {
          Hour: "20:00",
          MeanCPUUtilization: 2.780734468676649
        },
        {
          Hour: "21:00",
          MeanCPUUtilization: 5.190570457067995
        },
        {
          Hour: "22:00",
          MeanCPUUtilization: 4.103533314087453
        },
        {
          Hour: "23:00",
          MeanCPUUtilization: 6.1858729530045435
        }
      ]
    },
    {
      id: "db-0a1b2c3d4e",
      type: "db.m5.large",
      service: "RDS",
      cpu: 65,
      memory: 72,
      hourlyHistory: [
        {
          Hour: "0:00",
          MeanCPUUtilization: 3.031377092968584
        },
        {
          Hour: "1:00",
          MeanCPUUtilization: 6.066357627825918
        },
        {
          Hour: "2:00",
          MeanCPUUtilization: 3.0946027595446184
        },
        {
          Hour: "3:00",
          MeanCPUUtilization: 2.652826755927839
        },
        {
          Hour: "4:00",
          MeanCPUUtilization: 9.95026286565549
        },
        {
          Hour: "5:00",
          MeanCPUUtilization: 9.975719606770145
        },
        {
          Hour: "6:00",
          MeanCPUUtilization: 6.150254240874485
        },
        {
          Hour: "7:00",
          MeanCPUUtilization: 10.539039571940744
        },
        {
          Hour: "8:00",
          MeanCPUUtilization: 3.3233889924926427
        },
        {
          Hour: "9:00",
          MeanCPUUtilization: 10.202207641741657
        },
        {
          Hour: "10:00",
          MeanCPUUtilization: 3.3500918376263185
        },
        {
          Hour: "11:00",
          MeanCPUUtilization: 2.7673808075724775
        },
        {
          Hour: "12:00",
          MeanCPUUtilization: 40.39874005752385
        },
        {
          Hour: "13:00",
          MeanCPUUtilization: 27.57649667597588
        },
        {
          Hour: "14:00",
          MeanCPUUtilization: 5.142884859515039
        },
        {
          Hour: "15:00",
          MeanCPUUtilization: 3.0326462969007477
        },
        {
          Hour: "16:00",
          MeanCPUUtilization: 2.72167992927441
        },
        {
          Hour: "17:00",
          MeanCPUUtilization: 4.951835548368724
        },
        {
          Hour: "18:00",
          MeanCPUUtilization: 5.173798776115688
        },
        {
          Hour: "19:00",
          MeanCPUUtilization: 6.059275114183463
        },
        {
          Hour: "20:00",
          MeanCPUUtilization: 2.780734468676649
        },
        {
          Hour: "21:00",
          MeanCPUUtilization: 5.190570457067995
        },
        {
          Hour: "22:00",
          MeanCPUUtilization: 4.103533314087453
        },
        {
          Hour: "23:00",
          MeanCPUUtilization: 6.1858729530045435
        }
      ]
    },
    {
      id: "db-1b2c3d4e5f",
      type: "db.r5.xlarge",
      service: "RDS",
      cpu: 18,
      memory: 42,
      hourlyHistory: [
        {
          Hour: "0:00",
          MeanCPUUtilization: 3.031377092968584
        },
        {
          Hour: "1:00",
          MeanCPUUtilization: 6.066357627825918
        },
        {
          Hour: "2:00",
          MeanCPUUtilization: 3.0946027595446184
        },
        {
          Hour: "3:00",
          MeanCPUUtilization: 2.652826755927839
        },
        {
          Hour: "4:00",
          MeanCPUUtilization: 9.95026286565549
        },
        {
          Hour: "5:00",
          MeanCPUUtilization: 9.975719606770145
        },
        {
          Hour: "6:00",
          MeanCPUUtilization: 6.150254240874485
        },
        {
          Hour: "7:00",
          MeanCPUUtilization: 10.539039571940744
        },
        {
          Hour: "8:00",
          MeanCPUUtilization: 3.3233889924926427
        },
        {
          Hour: "9:00",
          MeanCPUUtilization: 10.202207641741657
        },
        {
          Hour: "10:00",
          MeanCPUUtilization: 3.3500918376263185
        },
        {
          Hour: "11:00",
          MeanCPUUtilization: 2.7673808075724775
        },
        {
          Hour: "12:00",
          MeanCPUUtilization: 40.39874005752385
        },
        {
          Hour: "13:00",
          MeanCPUUtilization: 27.57649667597588
        },
        {
          Hour: "14:00",
          MeanCPUUtilization: 5.142884859515039
        },
        {
          Hour: "15:00",
          MeanCPUUtilization: 3.0326462969007477
        },
        {
          Hour: "16:00",
          MeanCPUUtilization: 2.72167992927441
        },
        {
          Hour: "17:00",
          MeanCPUUtilization: 4.951835548368724
        },
        {
          Hour: "18:00",
          MeanCPUUtilization: 5.173798776115688
        },
        {
          Hour: "19:00",
          MeanCPUUtilization: 6.059275114183463
        },
        {
          Hour: "20:00",
          MeanCPUUtilization: 2.780734468676649
        },
        {
          Hour: "21:00",
          MeanCPUUtilization: 5.190570457067995
        },
        {
          Hour: "22:00",
          MeanCPUUtilization: 4.103533314087453
        },
        {
          Hour: "23:00",
          MeanCPUUtilization: 6.1858729530045435
        }
      ]
    },
    {
      id: "es-0a1b2c3d4e",
      type: "m5.large.elasticsearch",
      service: "Elasticsearch",
      cpu: 38,
      memory: 55,
      hourlyHistory: [
        {
          Hour: "0:00",
          MeanCPUUtilization: 3.031377092968584
        },
        {
          Hour: "1:00",
          MeanCPUUtilization: 6.066357627825918
        },
        {
          Hour: "2:00",
          MeanCPUUtilization: 3.0946027595446184
        },
        {
          Hour: "3:00",
          MeanCPUUtilization: 2.652826755927839
        },
        {
          Hour: "4:00",
          MeanCPUUtilization: 9.95026286565549
        },
        {
          Hour: "5:00",
          MeanCPUUtilization: 9.975719606770145
        },
        {
          Hour: "6:00",
          MeanCPUUtilization: 6.150254240874485
        },
        {
          Hour: "7:00",
          MeanCPUUtilization: 10.539039571940744
        },
        {
          Hour: "8:00",
          MeanCPUUtilization: 3.3233889924926427
        },
        {
          Hour: "9:00",
          MeanCPUUtilization: 10.202207641741657
        },
        {
          Hour: "10:00",
          MeanCPUUtilization: 3.3500918376263185
        },
        {
          Hour: "11:00",
          MeanCPUUtilization: 2.7673808075724775
        },
        {
          Hour: "12:00",
          MeanCPUUtilization: 40.39874005752385
        },
        {
          Hour: "13:00",
          MeanCPUUtilization: 27.57649667597588
        },
        {
          Hour: "14:00",
          MeanCPUUtilization: 5.142884859515039
        },
        {
          Hour: "15:00",
          MeanCPUUtilization: 3.0326462969007477
        },
        {
          Hour: "16:00",
          MeanCPUUtilization: 2.72167992927441
        },
        {
          Hour: "17:00",
          MeanCPUUtilization: 4.951835548368724
        },
        {
          Hour: "18:00",
          MeanCPUUtilization: 5.173798776115688
        },
        {
          Hour: "19:00",
          MeanCPUUtilization: 6.059275114183463
        },
        {
          Hour: "20:00",
          MeanCPUUtilization: 2.780734468676649
        },
        {
          Hour: "21:00",
          MeanCPUUtilization: 5.190570457067995
        },
        {
          Hour: "22:00",
          MeanCPUUtilization: 4.103533314087453
        },
        {
          Hour: "23:00",
          MeanCPUUtilization: 6.1858729530045435
        }
      ]
    },
    {
      id: "es-1b2c3d4e5f",
      type: "c5.xlarge.elasticsearch",
      service: "Elasticsearch",
      cpu: 72,
      memory: 68,
      hourlyHistory: [
        {
          Hour: "0:00",
          MeanCPUUtilization: 3.031377092968584
        },
        {
          Hour: "1:00",
          MeanCPUUtilization: 6.066357627825918
        },
        {
          Hour: "2:00",
          MeanCPUUtilization: 3.0946027595446184
        },
        {
          Hour: "3:00",
          MeanCPUUtilization: 2.652826755927839
        },
        {
          Hour: "4:00",
          MeanCPUUtilization: 9.95026286565549
        },
        {
          Hour: "5:00",
          MeanCPUUtilization: 9.975719606770145
        },
        {
          Hour: "6:00",
          MeanCPUUtilization: 6.150254240874485
        },
        {
          Hour: "7:00",
          MeanCPUUtilization: 10.539039571940744
        },
        {
          Hour: "8:00",
          MeanCPUUtilization: 3.3233889924926427
        },
        {
          Hour: "9:00",
          MeanCPUUtilization: 10.202207641741657
        },
        {
          Hour: "10:00",
          MeanCPUUtilization: 3.3500918376263185
        },
        {
          Hour: "11:00",
          MeanCPUUtilization: 2.7673808075724775
        },
        {
          Hour: "12:00",
          MeanCPUUtilization: 40.39874005752385
        },
        {
          Hour: "13:00",
          MeanCPUUtilization: 27.57649667597588
        },
        {
          Hour: "14:00",
          MeanCPUUtilization: 5.142884859515039
        },
        {
          Hour: "15:00",
          MeanCPUUtilization: 3.0326462969007477
        },
        {
          Hour: "16:00",
          MeanCPUUtilization: 2.72167992927441
        },
        {
          Hour: "17:00",
          MeanCPUUtilization: 4.951835548368724
        },
        {
          Hour: "18:00",
          MeanCPUUtilization: 5.173798776115688
        },
        {
          Hour: "19:00",
          MeanCPUUtilization: 6.059275114183463
        },
        {
          Hour: "20:00",
          MeanCPUUtilization: 2.780734468676649
        },
        {
          Hour: "21:00",
          MeanCPUUtilization: 5.190570457067995
        },
        {
          Hour: "22:00",
          MeanCPUUtilization: 4.103533314087453
        },
        {
          Hour: "23:00",
          MeanCPUUtilization: 6.1858729530045435
        }
      ]
    }
  ],
  recommendations: {
    reservedInstances: [
      {
        title: "Modify 1 underutilized RI (m5.xlarge)",
        description:
          "This RI is underutilized. Consider modifying it to a smaller instance type.",
        savings: "$210/month",
        impact: "High"
      },
      {
        title: "Purchase 1 additional RI (c5.2xlarge)",
        description:
          "This RI is overutilized. Consider purchasing an additional RI to cover the usage.",
        savings: "$320/month",
        impact: "Medium"
      }
    ],
    additionalRecommendations: [
      {
        name: "Reassign workloads to better utilize RIs",
        term: "1 year",
        savings: "$1290/month",
        commitment: "$3200/month",
        savingsPercent: "40%"
      },
      {
        name: "Consider using spot instances for non-critical workloads",
        term: "1 year",
        savings: "$1500/month",
        commitment: "$2500/month",
        savingsPercent: "60%"
      }
    ]
  }
};
