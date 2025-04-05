import { Badge } from "@/components/ui/badge";
import { response } from "@/data/response";

export function RiUtilizationChart() {
  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 mb-6">
        {response.riUtilizationData.map((item, index) => (
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
                  : "#FEE2E2"
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
                    : "#DC2626"
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
        {response.riRecommendations.map((rec, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 border rounded-md shadow-sm"
          >
            <p className="text-sm font-medium text-gray-700">{rec.label}</p>
            <Badge
              className="px-3 py-1 text-white"
              style={{
                backgroundColor:
                  index === 0 ? "#DC2626" : index === 1 ? "#047857" : "#2563EB"
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
