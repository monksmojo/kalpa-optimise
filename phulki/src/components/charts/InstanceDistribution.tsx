import { instanceTypes } from "@/data/instanceDistribution";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

export function InstanceDistribution() {
  return (
    <>
      {instanceTypes.map((instance) => (
        <div
          key={instance.family}
          className="w-full items-center space-x-4 mb-2"
        >
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
          <Progress
            value={instance.percentage}
            className="h-6 rounded-sm bg-gray-200"
          />
        </div>
      ))}
    </>
  );
}
