import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export const InProgress = ({ message }: { message: string }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Please wait</CardTitle>
        <CardDescription>{message} </CardDescription>
      </CardHeader>
    </Card>
  );
};
