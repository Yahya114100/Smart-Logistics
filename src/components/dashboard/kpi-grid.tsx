import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPIS } from "@/lib/mockData";
import { Truck, Siren, Clock, ShieldCheck } from "lucide-react";

export function KpiGrid() {
    const iconMap: any = {
        Truck: Truck,
        Siren: Siren,
        Clock: Clock,
        ShieldCheck: ShieldCheck
    };

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {KPIS.map((kpi, i) => {
                const Icon = iconMap[kpi.iconName];
                const isPositive = kpi.trend === "up";
                // Contextual coloring: Alerts going up is bad, others up is good usually.
                // For simplicity, let's just style by the change text for now or specific logic.
                const colorClass = kpi.title.includes("Alerts") && kpi.change.startsWith("+")
                    ? "text-destructive"
                    : kpi.title.includes("Delay") && kpi.change.startsWith("-")
                        ? "text-success" // Delay went down, good
                        : kpi.change.startsWith("+")
                            ? "text-success"
                            : "text-muted-foreground";

                return (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {kpi.title}
                            </CardTitle>
                            <Icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{kpi.value}</div>
                            <p className={`text-xs ${colorClass} mt-1 font-medium`}>
                                {kpi.change} from last month
                            </p>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
