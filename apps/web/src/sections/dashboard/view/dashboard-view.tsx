import { Button } from "@/components/ui/button";
import { BadgeAlert } from "lucide-react";

export function DashboardView() {
  return (
    <div>
      <div className="h-screen flex items-center justify-center">
        <Button variant="default" size="sm">
          <BadgeAlert />
          Click me
        </Button>
      </div>
    </div>
  );
}
